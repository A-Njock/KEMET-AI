import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  desc: string;
  to: string;
}

export default function Card({ title, desc, to }: CardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer bg-white border-gold border-2 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300"
      onClick={() => navigate(to)}
    >
      <h3 className="font-heading text-xl text-gold mb-2">{title}</h3>
      <p className="text-black">{desc}</p>
    </div>
  );
}

