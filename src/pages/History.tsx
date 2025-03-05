
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { HistoryHeader } from "@/components/history/HistoryHeader";
import { EmptyHistoryCard } from "@/components/history/EmptyHistoryCard";
import { PredictionCard } from "@/components/history/PredictionCard";
import { usePredictionHistory } from "@/hooks/usePredictionHistory";

const History = () => {
  const { predictions, isLoading } = usePredictionHistory();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <HistoryHeader isUserLoggedIn={!!user} onLogout={handleLogout} />
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-wildfire-500">Loading history...</div>
            </div>
          ) : !user || predictions.length === 0 ? (
            <EmptyHistoryCard isLoggedIn={!!user} />
          ) : (
            <div className="space-y-6">
              {predictions.map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
