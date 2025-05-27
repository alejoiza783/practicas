import React, { useState, useEffect, useRef } from 'react';
import { 
  FaSearch, 
  FaEllipsisH, 
  FaRegComment, 
  FaArrowLeft, 
  FaPaperPlane, 
  FaSmile,
  FaCheck
} from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import ModalConfi from '../formularios/modal_confi';
import './matches_chats.css';

const MatchesChats = () => {
  const [activeSection, setActiveSection] = useState('matches');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [conversations, setConversations] = useState([
    { 
      id: 1,
      name: 'Lii Fernandez', 
      lastMessage: 'Hola, ¿cómo estás?', 
      time: '10:30 AM',
      photo: 'https://randomuser.me/api/portraits/women/33.jpg',
      unread: false,
      online: true,
      messages: [
        { id: 1, sender: 'them', text: 'Hola, ¿cómo estás?', time: '10:30 AM', status: 'read' }
      ]
    },
    { 
      id: 2,
      name: 'Lana Roades', 
      lastMessage: 'Nos vemos mañana', 
      time: 'Ayer',
      photo: 'https://i.scdn.co/image/ab67616d00001e02723b32e28332ce5733aea62d',
      unread: true,
      online: false,
      messages: [
        { id: 1, sender: 'them', text: 'Hola!', time: '2:30 PM', status: 'read' },
        { id: 2, sender: 'me', text: 'Hola, qué tal?', time: '2:35 PM', status: 'read' },
        { id: 3, sender: 'them', text: 'Nos vemos mañana', time: '5:45 PM', status: 'read' }
      ]
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showEmojiPicker && 
          !emojiPickerRef.current?.contains(e.target) && 
          e.target.className !== 'emoji-button' &&
          !e.target.closest('.emoji-button')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleConfirm = () => setShowModal(false);

  const handleEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
    inputRef.current.focus();
  };

  const matchesData = [
    { 
      id: 1,
      name: 'Dennis Rodriguez', 
      time: 'Hace 15 min', 
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      mutualFriends: 3,
      online: true,
      interests: ['Viajes', 'Música', 'Deportes']
    },
    { 
      id: 2,
      name: 'Estefhano Mendez', 
      time: 'Hace 1 hora', 
      photo: 'https://randomuser.me/api/portraits/men/44.jpg',
      mutualFriends: 5,
      online: false,
      interests: ['Arte', 'Cine']
    },
    { 
      id: 3,
      name: 'Moroni Silva', 
      time: 'Ayer', 
      photo: 'https://randomuser.me/api/portraits/men/67.jpg',
      mutualFriends: 2,
      online: true,
      interests: ['Tecnología', 'Fotografía']
    }
  ];

  const filteredMatches = matchesData.filter(match =>
    match.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSearch = () => {
    setShowSearchInput(!showSearchInput);
    if (showSearchInput) {
      setSearchTerm('');
    }
  };

  const handleStartChat = (match) => {
    const existingConversation = conversations.find(c => c.name === match.name);
    
    if (existingConversation) {
      setActiveChat(existingConversation);
    } else {
      const newConversation = {
        id: conversations.length + 1,
        name: match.name,
        lastMessage: '',
        time: 'Ahora',
        photo: match.photo,
        unread: false,
        online: match.online,
        messages: []
      };
      setConversations([...conversations, newConversation]);
      setActiveChat(newConversation);
    }
    setActiveSection('conversations');
  };

  const handleSendMessage = () => {
    if (message.trim() === '' || !activeChat) return;
    
    const newMessage = {
      id: activeChat.messages.length + 1,
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeChat.id) {
        return {
          ...conv,
          lastMessage: message,
          time: 'Ahora',
          messages: [...conv.messages, newMessage],
          unread: false
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveChat(updatedConversations.find(c => c.id === activeChat.id));
    setMessage('');
    setShowEmojiPicker(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const closeChat = () => {
    setActiveChat(null);
    setShowEmojiPicker(false);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="matches-app">
      {showModal && <ModalConfi onConfirm={handleConfirm} />}

      {activeChat ? (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-content">
              <button className="back-button" onClick={closeChat}>
                <FaArrowLeft />
              </button>
              <div className="chat-user-info">
                <div className="user-avatar-container">
                  <img src={activeChat.photo} alt={activeChat.name} className="user-avatar" />
                  {activeChat.online && <span className="online-status"></span>}
                </div>
                <div className="user-details">
                  <h3>{activeChat.name}</h3>
                  <p className="user-status">
                    {activeChat.online ? (
                      <span className="online">En línea</span>
                    ) : (
                      <span className="offline">Visto por última vez {activeChat.time}</span>
                    )}
                  </p>
                </div>
              </div>
              <button className="menu-button">
                <FaEllipsisH />
              </button>
            </div>
          </div>
          
          <div className="chat-messages-container">
            <div className="chat-messages">
              <div className="date-separator">
                <span>{formatDate(new Date())}</span>
              </div>
              
              {activeChat.messages.map((msg) => (
                <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <div className="message-meta">
                      <span className="message-time">{msg.time}</span>
                      {msg.sender === 'me' && (
                        <span className={`message-status ${msg.status}`}>
                          {msg.status === 'read' ? (
                            <FaCheck className="double-check" />
                          ) : (
                            <FaCheck />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="message-input-container">
            <button 
              className="emoji-button" 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FaSmile />
            </button>
            
            {showEmojiPicker && (
              <div className="emoji-picker-container" ref={emojiPickerRef}>
                <EmojiPicker 
                  onEmojiClick={handleEmojiClick}
                  width={300}
                  height={350}
                  searchDisabled={false}
                  skinTonesDisabled
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
            
            <div className="message-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowEmojiPicker(false)}
              />
            </div>
            <button 
              className={`send-button ${message.trim() ? 'active' : ''}`}
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <div className="matches-main">
          <div className="matches-header">
            <h1>Matches</h1>
            <div className="header-actions">
              {showSearchInput ? (
                <div className="search-container">
                  <input
                    type="text"
                    placeholder={`Buscar ${activeSection === 'matches' ? 'matches' : 'mensajes'}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <button className="close-search" onClick={toggleSearch}>
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <button className="search-button" onClick={toggleSearch}>
                    <FaSearch />
                  </button>
                  <button className="menu-button">
                    <FaEllipsisH />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="matches-tabs">
            <button 
              className={`tab ${activeSection === 'matches' ? 'active' : ''}`}
              onClick={() => setActiveSection('matches')}
            >
              Matches
            </button>
            <button 
              className={`tab ${activeSection === 'conversations' ? 'active' : ''}`}
              onClick={() => setActiveSection('conversations')}
            >
              Mensajes
            </button>
          </div>

          <div className="matches-content">
            {activeSection === 'matches' ? (
              <div className="matches-grid">
                {filteredMatches.length > 0 ? (
                  filteredMatches.map(match => (
                    <div key={match.id} className="match-card">
                      <div className="match-photo-container">
                        <img src={match.photo} alt={match.name} />
                        {match.online && <span className="online-badge"></span>}
                      </div>
                      <div className="match-info">
                        <h3>{match.name}</h3>
                        <div className="match-meta">
                          <span>{match.mutualFriends} amigos en común</span>
                          <span>•</span>
                          <span>{match.time}</span>
                        </div>
                        {match.interests && (
                          <div className="interests">
                            {match.interests.map((interest, i) => (
                              <span key={i} className="interest-tag">#{interest}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button 
                        className="message-button"
                        onClick={() => handleStartChat(match)}
                      >
                        <FaRegComment /> Mensaje
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <FaRegComment />
                    </div>
                    <h3>No se encontraron matches</h3>
                    <p>Intenta ajustar tus criterios de búsqueda</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="conversations-list">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(conv => (
                    <div 
                      key={conv.id} 
                      className={`conversation-item ${conv.unread ? 'unread' : ''}`}
                      onClick={() => setActiveChat(conv)}
                    >
                      <div className="conversation-avatar">
                        <img src={conv.photo} alt={conv.name} />
                        {conv.online && <span className="online-badge"></span>}
                      </div>
                      <div className="conversation-details">
                        <div className="conversation-header">
                          <h3>{conv.name}</h3>
                          <span className="conversation-time">{conv.time}</span>
                        </div>
                        <div className="conversation-preview">
                          <p>{conv.lastMessage}</p>
                          {conv.unread && <span className="unread-indicator"></span>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <FaRegComment />
                    </div>
                    <h3>No hay conversaciones</h3>
                    <p>Empieza una nueva conversación con tus matches</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesChats;