import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <div className="bg-slate-100 flex flex-row h-screen w-screen">
      <Sidebar />
      <div>main content</div>
    </div>
  );
}
