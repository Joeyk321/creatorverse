import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams(); // This is actually the creator's name
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [originalName, setOriginalName] = useState(''); // Store original name for updates
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('name', id)
          .single();
        
        if (error) throw error;
        
        setFormData({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || ''
        });
        setOriginalName(data.name); // Store the original name
      } catch (error) {
        console.error('Error fetching creator:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('creators')
        .update(formData)
        .eq('name', originalName); // Use original name to find the record

      if (error) throw error;
      
      // Navigate to the updated creator (use new name if it was changed)
      navigate(`/creator/${formData.name}`);
    } catch (error) {
      console.error('Error updating creator:', error);
      alert('Error updating creator. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this creator?')) return;

    try {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('name', originalName); // Use original name to find the record

      if (error) throw error;
      
      navigate('/');
    } catch (error) {
      console.error('Error deleting creator:', error);
      alert('Error deleting creator. Please try again.');
    }
  };

  if (initialLoading) return <div>Loading...</div>;

  return (
    <div className="edit-creator">
      <h1>Edit Creator</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL (optional)</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
        <button type="button" onClick={() => navigate('/')}>
  Cancel
</button>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Creator'}
          </button>
          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Creator
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;