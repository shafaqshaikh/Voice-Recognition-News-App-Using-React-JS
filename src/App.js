import React , {useEffect , useState} from 'react';
import './App.css';
import wordsToNumbers from 'words-to-numbers'
import NewsCards from './components/NewsCards'
import alanBtn from '@alan-ai/alan-sdk-web'
import useStyles from './styles.js';
const alanKey='1b282466ce34e96262da6c881616862a2e956eca572e1d8b807a3e2338fdd0dc/stage'
function App() {
  const [newsArticles , setNewsArticles]=useState([])
  const [activeArticle , setActiveArticle]=useState(-1)
  const classes = useStyles()
  useEffect(()=>{
    alanBtn({
      key : alanKey,
      onCommand : ({command , articles , number})=>{
        if (command==='newHeadlines'){
          setNewsArticles(articles)
          setActiveArticle(-1)
        }else if (command==='highlight'){
            setActiveArticle((prevActiveArticle)=>prevActiveArticle+1)
        }else if (command==='open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      }
    })
  },[])
  return (
    <div className="App">
    <div className={classes.logoContainer}>
    <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
    </div>
    <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
