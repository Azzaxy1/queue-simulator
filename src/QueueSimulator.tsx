import React, { useEffect, useState } from "react";
import Customer from "./assets/user.png";
import Swal from "sweetalert2";
import QueueImg from "./assets/queue.png";

type QueueProps = {
  title: string;
  addBtn: string;
  serveBtn: string;
};

interface Customer {
  id: number;
  name: string;
}

const QueueSimulator: React.FC<QueueProps> = ({ title, addBtn, serveBtn }) => {
  const [queue, setQueue] = useState<Customer[]>([]);
  const [counter, setCounter] = useState(0);

  const addCustomer = async () => {
    const { value: customerName } = await Swal.fire({
      title: "Masukan Nama Pelanggan",
      input: "text",
      text: "Nama anda",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Nama tidak boleh kosong";
        }
      },
    });

    const newQueue = {
      id: counter + 1,
      name: `${customerName}`,
    };
    const updatedQueue = [...queue, newQueue];
    setQueue(updatedQueue);
    localStorage.setItem("customer", JSON.stringify(updatedQueue));
    setCounter(counter + 1);

    if (customerName) {
      Swal.fire({
        title: "Pelanggan berhasil masuk kedalam antrian",
        icon: "success",
      });
    }
  };

  const serveCustomer = () => {
    setQueue(queue.slice(1));
    Swal.fire({
      title: "Berhasil keluar!",
      text: "Terimakasih sudah mempercayakan layanan kami.",
      icon: "success",
      confirmButtonText: "Oke",
    });
  };

  useEffect(() => {
    const storedQueue = localStorage.getItem("customer");
    if (storedQueue) {
      setQueue(JSON.parse(storedQueue));
    }
  }, []);

  return (
    <div className="max-w-lg p-6 mx-auto space-y-4 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col items-center">
        <img width={50} src={QueueImg} />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <div className="space-y-2">
        <button
          onClick={addCustomer}
          className="px-4 py-2 mr-4 text-white bg-blue-500 rounded"
        >
          {addBtn}
        </button>
        <button
          onClick={serveCustomer}
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          {serveBtn}
        </button>
      </div>
      <ul className="mt-4 space-y-1">
        {queue.length > 0 ? (
          queue.map((customer, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-2 bg-gray-100 rounded"
            >
              <img src={Customer} width={30} />
              Nama Pelanggan :<span className="font-bold">{customer.name}</span>
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
