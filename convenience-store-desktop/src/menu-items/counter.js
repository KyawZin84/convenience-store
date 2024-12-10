import { DollarOutlined } from '@ant-design/icons';

const counter = {
  id: 'counter',
  title: 'Counter',
  type: 'group',
  children: [
    {
      id: 'screens-counters',
      title: 'Counter',
      type: 'item',
      url: '/counter',
      icon: DollarOutlined,
      hide: false
    }
  ]
};

export default counter;
