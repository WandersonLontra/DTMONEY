import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model} from 'miragejs';

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela Software',
          type: 'deposit',
          category: 'Service',
          amount: 6000,
          createdAt: new Date('2121-10-12 00:46:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'contas',
          amount: 2000,
          createdAt: new Date('2121-10-13 09:40:00')
        }
      ]
    })
  },

  routes() {
    this.namespace= 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema,request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
