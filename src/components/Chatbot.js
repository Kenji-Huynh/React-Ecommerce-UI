import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/chatbotService';
import './Chatbot.css';

const Chatbot = ({ allProducts, onProductSelect, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý AI của TEMPO. Bạn cần tư vấn gì về khóa học, sách, tài liệu tiếng Anh?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(inputText, allProducts);
      const botMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'bot',
        timestamp: new Date(),
        suggestedProducts: response.suggestedProducts || []
      };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        text: "Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu của bạn.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleProductClick = (product) => {
    onProductSelect(product);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>🤖 Trợ lý AI TEMPO</span>
        <button onClick={onClose} className="chatbot-close-btn">×</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
            <div className="chatbot-message-content">{msg.text}</div>
            {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
              <div className="chatbot-suggested-products">
                <b>Sản phẩm gợi ý:</b>
                <ul>
                  {msg.suggestedProducts.map(product => (
                    <li key={product.id} onClick={() => handleProductClick(product)} style={{cursor:'pointer', color:'#3498db'}}>
                      {product.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="chatbot-message bot">Đang trả lời...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Nhập tin nhắn..."
          rows={2}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={!inputText.trim() || isLoading}>Gửi</button>
      </div>
    </div>
  );
};

export default Chatbot;