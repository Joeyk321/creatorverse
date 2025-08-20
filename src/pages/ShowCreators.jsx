import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
.order('name', { ascending: true });        
        if (error) throw error;
        setCreators(data || []);
      } catch (error) {
        console.error('Error fetching creators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="show-creators">
      <header>
        <h1>🌟 Creatorverse</h1>
        <Link to="/new">
          <button>Add New Creator</button>
        </Link>
      </header>
      
      <main>
        {creators.length === 0 ? (
          <p>No content creators found. Add some creators to get started!</p>
        ) : (
          <div className="creators-grid">
            {creators.map((creator) => (
              <Card key={creator.id} creator={creator} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowCreators;