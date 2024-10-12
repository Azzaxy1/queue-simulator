import QueueSimulator from "./QueueSimulator";
import Footer from "./components/Footer.js";

const App: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <QueueSimulator
          title="Simulasi Antrian"
          addBtn="Tambah Pelanggan"
          serveBtn="Melayani Pelanggan"
        />
      </div>
      <Footer createdBy="Abdurrohman Azis" />
    </>
  );
};

export default App;

