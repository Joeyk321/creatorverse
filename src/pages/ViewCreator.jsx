import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('name', id)
          .single();
        
        if (error) throw error;
        setCreator(data);
      } catch (error) {
        console.error('Error fetching creator:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!creator) return <div>Creator not found</div>;

  return (
    <div className="view-creator">
      <Link to="/">← Back to All Creators</Link>
      
      <div className="creator-details">
        {creator.imageURL && (
          <img src={creator.imageURL} alt={creator.name} />
        )}
        <h1>{creator.name}</h1>
        <p>{creator.description}</p>
        <a href={creator.url} target="_blank" rel="noopener noreferrer">
          <button>Visit Their Channel</button>
        </a>
        <div className="actions">
         <Link to={`/edit/${creator.name}`}>
  <button>Edit Creator</button>
</Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;