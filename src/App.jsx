import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button, Badge, Space, message, ConfigProvider, theme, Modal, Input, InputNumber, Empty, Rate, Avatar } from 'antd';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Hop, Beer, GlassWater, ShoppingCart, Star, MapPin, Phone, Flame, Trash2, User, Quote } from 'lucide-react';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const BEER_DATA = [
  { id: 1, name: 'Золото Бишкека', style: 'Лагер', price: 250, rating: 5, icon: <Hop size={32} color="#faad14" />, hot: true },
  { id: 2, name: 'Тянь-Шань Стаут', style: 'Темное', price: 320, rating: 4.8, icon: <Beer size={32} color="#3f2a1d" />, hot: false },
  { id: 3, name: 'Иссык-Куль IPA', style: 'Крафт', price: 380, rating: 5, icon: <GlassWater size={32} color="#52c41a" />, hot: true },
];

const REVIEWS = [
  { id: 1, user: 'Азамат', text: 'Лучшее крафтовое в городе! Доставили быстро.', rate: 5 },
  { id: 2, user: 'Мария', text: 'Очень уютная атмосфера и стаут просто огонь.', rate: 5 },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Прогресс скролла
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const addToCart = (beer) => {
    setCart([...cart, { ...beer, cartId: Date.now() }]);
    message.success(`${beer.name} в корзине!`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.cartId !== id));
  };

  const totalSum = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: '#faad14' } }}>
      {/* Прогресс-бар прокрутки */}
      <motion.div style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: 4, background: '#faad14', zIndex: 1000, originX: 0 }} />

      <Layout style={{ minHeight: '100vh', background: '#05070a', color: '#fff' }}>
        
        {/* ХЕДЕР */}
        <Header style={{ 
          position: 'sticky', top: 0, zIndex: 99, display: 'flex', 
          justifyContent: 'space-between', alignItems: 'center', padding: '0 5%',
          background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a'
        }}>
          <Space size="middle">
            <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Beer color="#faad14" size={28} />
            </motion.div>
            <Title level={4} style={{ margin: 0, color: '#fff', fontWeight: 800 }}>PIVO PRO</Title>
          </Space>
          
          <Badge count={cart.length} color="#faad14">
            <Button type="text" icon={<ShoppingCart color="#fff" />} onClick={() => setIsCartOpen(true)} />
          </Badge>
        </Header>

        <Content>
          {/* ГЛАВНЫЙ ЭКРАН */}
          <section style={{ 
            padding: '120px 5%', textAlign: 'center', 
            background: 'radial-gradient(circle at center, #1a1405 0%, #05070a 100%)',
            overflow: 'hidden'
          }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <Tag text="BISHKEK CRAFT BREWERY" />
              <Title style={{ color: '#fff', fontSize: 'clamp(45px, 9vw, 90px)', fontWeight: 900, letterSpacing: -2 }}>
                ВКУС СИЛЫ — <br/> <span style={{ color: '#faad14' }}>ВЫБОР МАСТЕРОВ</span>
              </Title>
              <Space size="large">
                <Button type="primary" size="large" onClick={() => setIsModalOpen(true)} style={{ height: 55, padding: '0 40px', fontWeight: 'bold' }}>
                  БРОНЬ СТОЛА
                </Button>
                <Button size="large" ghost style={{ height: 55, padding: '0 40px' }}>МЕНЮ</Button>
              </Space>
            </motion.div>
          </section>

          {/* КАТАЛОГ (СОМЫ) */}
          <div style={{ padding: '80px 5%' }}>
            <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 50 }}>АКТУАЛЬНЫЕ СОРТА</Title>
            <Row gutter={[32, 32]}>
              {BEER_DATA.map((beer) => (
                <Col xs={24} md={8} key={beer.id}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <div style={{ background: '#0d1117', padding: 30, borderRadius: 24, border: '1px solid #21262d' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {beer.icon}
                        {beer.hot && <Flame color="#ff4d4f" fill="#ff4d4f" size={20} />}
                      </div>
                      <Title level={3} style={{ color: '#fff', marginTop: 25 }}>{beer.name}</Title>
                      <Text style={{ color: '#8b949e' }}>{beer.style} • {beer.rating} <Star size={12} fill="#faad14" color="#faad14" /></Text>
                      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: '900', color: '#fff' }}>{beer.price} сом</Text>
                        <Button type="primary" shape="round" onClick={() => addToCart(beer)}>Купить</Button>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>

          {/* ОТЗЫВЫ */}
          <div style={{ padding: '80px 5%', background: '#080a0d' }}>
            <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 50 }}>ОТЗЫВЫ ГОСТЕЙ</Title>
            <Row gutter={[24, 24]}>
              {REVIEWS.map(rev => (
                <Col xs={24} md={12} key={rev.id}>
                  <div style={{ background: '#161b22', padding: 30, borderRadius: 20, position: 'relative' }}>
                    <Quote size={40} color="#faad14" style={{ opacity: 0.1, position: 'absolute', right: 20, top: 20 }} />
                    <Space style={{ marginBottom: 15 }}>
                      <Avatar icon={<User />} />
                      <Text strong style={{ color: '#fff' }}>{rev.user}</Text>
                    </Space>
                    <Paragraph style={{ color: '#8b949e', fontStyle: 'italic' }}>"{rev.text}"</Paragraph>
                    <Rate disabled defaultValue={rev.rate} style={{ fontSize: 14 }} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Content>

        {/* КОРЗИНА */}
        <Modal
          title="Ваш заказ"
          open={isCartOpen}
          onCancel={() => setIsCartOpen(false)}
          footer={[
            <div style={{ textAlign: 'left', marginBottom: 20 }}>
              <Title level={4}>Итого: {totalSum} сом</Title>
            </div>,
            <Button block type="primary" size="large" onClick={() => message.success('Заказ оформлен!')}>
              ОФОРМИТЬ ДОСТАВКУ
            </Button>
          ]}
        >
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #30363d' }}>
                <Text style={{ color: '#c9d1d9' }}>{item.name}</Text>
                <Space>
                  <Text strong>{item.price} сом</Text>
                  <Trash2 size={18} color="#f85149" style={{ cursor: 'pointer' }} onClick={() => removeFromCart(item.cartId)} />
                </Space>
              </div>
            ))
          ) : <Empty description="Корзина пуста" />}
        </Modal>

        {/* БРОНЬ */}
        <Modal title="Бронирование" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Input size="large" placeholder="Ваше имя" />
            <Input size="large" placeholder="Номер телефона" prefix={<Phone size={16}/>} />
            <InputNumber size="large" style={{width:'100%'}} placeholder="Количество человек" />
            <Button type="primary" block size="large" onClick={() => { message.success('Ждем вас в гости!'); setIsModalOpen(false); }}>
              ПОДТВЕРДИТЬ
            </Button>
          </Space>
        </Modal>

        <Footer style={{ textAlign: 'center', background: '#010409', color: '#484f58', padding: '50px' }}>
          <Space direction="vertical">
            <Text style={{ color: '#8b949e' }}>PIVO PRO • 2026 • BISHKEK</Text>
            <Text style={{ fontSize: 10 }}>ЧРЕЗМЕРНОЕ УПОТРЕБЛЕНИЕ ПРИНОСИТ РАДОСТЬ И ВРЕД</Text>
          </Space>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

// Мини-компонент тега
const Tag = ({ text }) => (
  <div style={{ 
    display: 'inline-block', padding: '4px 12px', border: '1px solid #faad14', 
    borderRadius: 20, color: '#faad14', fontSize: 12, fontWeight: 'bold', marginBottom: 20 
  }}>
    {text}
  </div>
);