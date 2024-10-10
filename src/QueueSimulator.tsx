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
    setQueue([...queue, { id: counter + 1, name: `Pelanggan ${counter + 1}` }]);
    setCounter(counter + 1);
    localStorage.setItem("customer", JSON.stringify(queue));
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
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold">Simulasi Antrian</h1>
      <div className="space-y-2">
        <button
          onClick={addCustomer}
          className="bg-blue-500 mr-4 text-white px-4 py-2 rounded"
        >
          Tambahkan Pelanggan
        </button>
        <button
          onClick={serveCustomer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Melayani Pelanggan
        </button>
      </div>
      <ul className="space-y-1 mt-4">
        {queue.length > 0 ? (
          queue.map((customer, index) => (
            <li
              key={index}
              className="bg-gray-100 flex gap-3 items-center p-2 rounded"
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
