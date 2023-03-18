import { useParams } from 'react-router-dom';

export default function NewsListPage() {
    const params = useParams();
    console.log(params.word)
    return (

        <p>{params.word}</p>
        
    );
  }