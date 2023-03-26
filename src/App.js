import './styles.css';
import obj from './exp.json';
import Folder from './Component/Folder';

export default function App() {
  // console.log(root);

  return (
    <div className="App">
      <Folder folder={obj} root={obj} par={null} />
    </div>
  );
}
