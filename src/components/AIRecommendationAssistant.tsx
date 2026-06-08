'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: string }[];
}

export default function AIRecommendationAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage: Message = {
    sender: 'bot',
    text: "Hello! I am Aura, your AI Luxury Event Designer. Let's design your landmark experience. What type of celebration are we envisioning?",
    options: [
      { label: 'Dream Wedding 💍', action: 'wedding' },
      { label: 'Corporate Gala/Summit 🏢', action: 'corporate' },
      { label: 'Live Concert / Dj Set 🎸', action: 'concert' },
      { label: 'VIP Private Party 💎', action: 'private' },
    ],
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([initialBotMessage]);
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (optionLabel: string, action: string) => {
    // Add user message
    const userMsg: Message = { sender: 'user', text: optionLabel };
    setMessages((prev) => [...prev, userMsg]);

    // Generate automated smart response based on selection
    setTimeout(() => {
      let botResponse: Message;

      if (action === 'wedding') {
        botResponse = {
          sender: 'bot',
          text: 'Spectacular. For a luxury wedding, we recommend our "Royal Gazebo" 3D layout featuring an organic floral dome, warm golden stage lighting, and synchronized ambient uplighting. What is your approximate guest count?',
          options: [
            { label: 'Under 150 guests', action: 'wedding-small' },
            { label: '150 to 500 guests', action: 'wedding-medium' },
            { label: '500+ Luxury scale', action: 'wedding-large' },
          ],
        };
      } else if (action === 'corporate') {
        botResponse = {
          sender: 'bot',
          text: 'Understood. For corporate summits, we recommend our "Elite Boardroom" stage with wide-format LED wall arrays, clean cyan spotlight glows, and digital panel systems. What is the key objective?',
          options: [
            { label: 'Product Launch 🚀', action: 'corp-launch' },
            { label: 'Annual Award Gala 🏆', action: 'corp-gala' },
            { label: 'Keynote & Panel 🎙️', action: 'corp-panel' },
          ],
        };
      } else if (action === 'concert') {
        botResponse = {
          sender: 'bot',
          text: 'Awesome! For live concerts, our "Electric Arena" setup is unmatched. It features multi-tiered metallic trussing, pulse lasers, strobe spotlight beams, and high-intensity purple and pink staging lights. What size is the venue?',
          options: [
            { label: 'Intimate Club Staging 🎧', action: 'concert-small' },
            { label: 'Mid-Scale Theater 🎭', action: 'concert-medium' },
            { label: 'Massive Arena / Stadium 🏟️', action: 'concert-large' },
          ],
        };
      } else if (action.startsWith('wedding-') || action.startsWith('corp-') || action.startsWith('concert-')) {
        botResponse = {
          sender: 'bot',
          text: 'Perfect metrics. We have generated a custom package proposal including bespoke 3D staging visualizations, interactive LED design, and sound production. Would you like to lock this setup in our multi-step planner?',
          options: [
            { label: 'Reserve Staging Blueprint 📅', action: 'trigger-wizard' },
            { label: 'Reset Consultation 🔄', action: 'reset' },
          ],
        };
      } else if (action === 'trigger-wizard') {
        botResponse = {
          sender: 'bot',
          text: 'Launching the Eventoss staging wizard now...',
        };
        // Trigger Booking Wizard
        if (typeof window !== 'undefined' && (window as any).openConsultationWizard) {
          (window as any).openConsultationWizard();
        }
      } else if (action === 'reset') {
        botResponse = {
          sender: 'bot',
          text: 'Re-initializing. What type of celebration are we planning?',
          options: [
            { label: 'Dream Wedding 💍', action: 'wedding' },
            { label: 'Corporate Gala/Summit 🏢', action: 'corporate' },
            { label: 'Live Concert / Dj Set 🎸', action: 'concert' },
            { label: 'VIP Private Party 💎', action: 'private' },
          ],
        };
      } else {
        botResponse = {
          sender: 'bot',
          text: 'Thank you for the input. Let us proceed with designing this landmark event. I suggest connecting with our staging director directly.',
          options: [
            { label: 'Schedule Consultation Now 📞', action: 'trigger-wizard' },
          ],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 850);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    const input = inputValue.toLowerCase();
    setInputValue('');

    // Simulated responses to manual text inputs
    setTimeout(() => {
      let responseText = "That sounds wonderful. I've logged your preferences. We recommend initializing a formal blueprint design session.";
      let options = [{ label: 'Initialize Staging Wizard 🚀', action: 'trigger-wizard' }];

      if (input.includes('wedding') || input.includes('marriage')) {
        responseText = 'We specialize in royal, cinematic weddings! I recommend looking at our "Royal Gazebo" 3D design tier. Shall we customize this?';
        options = [
          { label: 'Yes, customize 💍', action: 'wedding' },
          { label: 'Speak to planner 📞', action: 'trigger-wizard' },
        ];
      } else if (input.includes('price') || input.includes('cost') || input.includes('budget')) {
        responseText = 'Staging and production budgets are calculated based on complexity, scale, and technology. You can use our interactive Cost Calculator on the homepage, or speak to our planner.';
        options = [
          { label: 'Try Budget Calculator 💰', action: 'scroll-calculator' },
          { label: 'Consult Planner 📞', action: 'trigger-wizard' },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: responseText,
          options: options.map((opt) => (opt.action === 'scroll-calculator' ? { ...opt, action: 'scroll-calculator' } : opt)),
        },
      ]);

      // Check special actions
      if (input.includes('calculator')) {
        const cal = document.getElementById('calculator');
        if (cal) cal.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  const executeAction = (action: string) => {
    if (action === 'scroll-calculator') {
      const cal = document.getElementById('calculator');
      if (cal) {
        cal.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Bubble Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel clickable"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)',
          color: 'var(--text-light)',
          boxShadow: '0 8px 30px var(--purple-glow)',
          zIndex: 999,
          border: '1px solid rgba(255,255,255,0.2)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'rotate(90deg) scale(0.95)' : 'scale(1)',
        }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Subtle Ping Glow */}
        {!isOpen && (
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: 'var(--gold)',
              border: '2.5px solid var(--bg-deep)',
            }}
          />
        )}
      </button>

      {/* Chat window panel */}
      {isOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '104px',
            right: '32px',
            width: '380px',
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            overflow: 'hidden',
            border: '1px solid var(--border-glass)',
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-input)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--purple) 0%, var(--cyan) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={16} style={{ color: 'var(--text-light)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-light)', fontWeight: 600 }}>Aura</h4>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>AI Event Designer • Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="clickable"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'none' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages List */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                  maxWidth: '85%',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: msg.sender === 'bot' ? 'rgba(108, 92, 231, 0.15)' : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: msg.sender === 'bot' ? 'var(--purple)' : 'var(--gold)',
                    border: '1px solid var(--border-glass)',
                    flexShrink: 0,
                  }}
                >
                  {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: msg.sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                      backgroundColor: msg.sender === 'user' ? 'var(--purple)' : 'var(--bg-input)',
                      border: msg.sender === 'user' ? 'none' : '1px solid var(--border-glass)',
                      fontSize: '0.85rem',
                      lineHeight: 1.4,
                      color: msg.sender === 'user' ? '#ffffff' : 'var(--text-light)',
                    }}
                  >
                    {msg.text}
                  </div>

                  {/* Options */}
                  {msg.options && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                      {msg.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            if (opt.action.startsWith('scroll-')) {
                              executeAction(opt.action);
                            } else {
                              handleOptionClick(opt.label, opt.action);
                            }
                          }}
                          className="glass-panel clickable"
                          style={{
                            padding: '10px 14px',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            textAlign: 'left',
                            color: 'var(--text-light)',
                            border: '1px solid var(--border-glass)',
                            borderRadius: '8px',
                            background: 'var(--bg-input)',
                            transition: 'all 0.25s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--purple)';
                            e.currentTarget.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-glass)';
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Form Input Footer */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border-glass)',
              display: 'flex',
              gap: '8px',
              background: 'rgba(0,0,0,0.2)',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Aura anything..."
              style={{
                flex: 1,
                padding: '10px 14px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                borderRadius: '20px',
                color: 'var(--text-input)',
                fontSize: '0.85rem',
                outline: 'none',
              }}
              className="clickable"
            />
            <button
              type="submit"
              className="clickable"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--purple)',
                color: 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'none',
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
