import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);

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
        .insert([formData]);

      if (error) throw error;
      
      navigate('/');
    } catch (error) {
      console.error('Error adding creator:', error);
      alert('Error adding creator. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-creator">
      <h1>Add New Creator</h1>
      
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
            placeholder="Creator's name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Channel URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="https://youtube.com/..."
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
            placeholder="What kind of content do they make?"
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
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Creator'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;