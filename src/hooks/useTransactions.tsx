import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    type: string;
    amount: number;
    category: string;
    createdAt: string;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}



const TransactionsContext = createContext({} as TransactionsContextData);


export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then((response: any) => {
                setTransactions(response.data.transactions);
            })
    }, []);

    async function createTransaction(transactionInput: TransactionInput){

        const {data} = await api.post<any>('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });

        const {transaction} = data;

        console.log(transaction)
        setTransactions([
            ...transactions,
            transaction
        ]);
    }


    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )

}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context
}

