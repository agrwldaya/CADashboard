import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const menuOptions = {
  main: {
    message: "Hello! How can I assist you today? Please choose from the options below:",
    options: [
      { id: 1, text: "Tell me about your services" },
      { id: 2, text: "I need tax advice" },
      { id: 3, text: "Book a consultation" },
      { id: 4, text: "Contact information" }
    ]
  },
  services: {
    message: "We offer various services. What would you like to know more about?",
    options: [
      { id: 1, text: "Audit & Assurance" },
      { id: 2, text: "Tax Planning" },
      { id: 3, text: "Business Advisory" },
      { id: 4, text: "Back to main menu" }
    ]
  },
  tax: {
    message: "What type of tax assistance do you need?",
    options: [
      { id: 1, text: "GST Filing" },
      { id: 2, text: "Income Tax Returns" },
      { id: 3, text: "Tax Planning" },
      { id: 4, text: "Back to main menu" }
    ]
  }
};

const responses = {
  "Tell me about your services": {
    answer: "We provide comprehensive CA services including audit, tax, and advisory.",
    nextMenu: "services"
  },
  "I need tax advice": {
    answer: "I'll help you with your tax-related queries.",
    nextMenu: "tax"
  },
  "Audit & Assurance": {
    answer: "Our audit services include statutory audits, internal audits, and compliance audits. We ensure thorough examination and reporting.",
    nextMenu: "main"
  },
  "GST Filing": {
    answer: "We handle complete GST compliance including registration, monthly/quarterly returns, and reconciliations.",
    nextMenu: "main"
  }
  // Add more responses as needed
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMenu, setCurrentMenu] = useState('main');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      handleBotResponse(menuOptions.main.message, menuOptions.main.options);
    }
  }, [messages]);

  const handleBotResponse = async (message, options = null) => {
    setIsTyping(true);
    
    // Add typing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newMessages = [...messages];
    newMessages.push({
      type: 'bot',
      content: message,
      options: options
    });
    
    setMessages(newMessages);
    setIsTyping(false);
  };

  const handleOptionClick = async (selectedOption) => {
    // Add user's selection to messages immediately
    const newMessages = [...messages, {
      type: 'user',
      content: selectedOption
    }];
    setMessages(newMessages);

    // Get response for the selected option
    const response = responses[selectedOption];
    if (response) {
      // Add delay before bot response
      await new Promise(resolve => setTimeout(resolve, 500));

      // Add bot's answer
      const updatedMessages = [...newMessages, {
        type: 'bot',
        content: response.answer
      }];
      setMessages(updatedMessages);

      // Add delay before showing next menu
      if (response.nextMenu && menuOptions[response.nextMenu]) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const nextMenu = menuOptions[response.nextMenu];
        const finalMessages = [...updatedMessages, {
          type: 'bot',
          content: nextMenu.message,
          options: nextMenu.options
        }];
        setMessages(finalMessages);
        setCurrentMenu(response.nextMenu);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <button onClick={() => {
              setIsOpen(false);
              setMessages([]);
              setCurrentMenu('main');
            }} className="hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                    CA
                  </div>
                )}
                <div className="max-w-[70%]">
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option.text)}
                          className="w-full text-left text-sm p-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                    U
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                  CA
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;