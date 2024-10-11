import React, { useEffect, useState } from "react";
import Customer from "./assets/user.png";

interface Customer {
  id: number;
  name: string;
}

const QueueSimulator: React.FC = () => {
  const [queue, setQueue] = useState<Customer[]>([]);
  const [counter, setCounter] = useState(0);

  const addCustomer = () => {
    const customerName = prompt("Tuliskan Nama Anda : ");
    const newQueue = {
      id: counter + 1,
      name: `Pelanggan ${customerName}`,
    };
    const updatedQueue = [...queue, newQueue];
    setQueue(updatedQueue);
    localStorage.setItem("customer", JSON.stringify(updatedQueue));
    setCounter(counter + 1);
  };

  const serveCustomer = () => {
    setQueue(queue.slice(1));
  };

  useEffect(() => {
    const storedQueue = localStorage.getItem("customer");
    if (storedQueue) {
      setQueue(JSON.parse(storedQueue));
    }
  }, []);

  return (
    <div className="max-w-lg p-6 mx-auto space-y-4 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold">Simulasi Antrian</h1>
      <div className="space-y-2">
        <button
          onClick={addCustomer}
          className="px-4 py-2 mr-4 text-white bg-blue-500 rounded"
        >
          Tambahkan Pelanggan
        </button>
        <button
          onClick={serveCustomer}
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          Melayani Pelanggan
        </button>
      </div>
      <ul className="mt-4 space-y-1">
        {queue.length > 0 ? (
          queue.map((customer, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-2 bg-gray-100 rounded"
            >
              <img src={Customer} width={30} className="" />
              {customer.name}
            </li>
          ))
        ) : (
          <p>Tidak ada pelanggan yang mengantri.</p>
        )}
      </ul>
    </div>
  );
};

export default QueueSimulator;
