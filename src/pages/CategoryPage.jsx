import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <h1>Bienvenid@s a la categoría {categoryId}</h1>
    </div>
  );
};

export default CategoryPage;
