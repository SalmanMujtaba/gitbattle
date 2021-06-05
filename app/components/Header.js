import  React from 'react';

export function Header({selectedLanguage, showSelected}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='flex-center'>
    {
      languages.map((language) => (
        <li key={language}>
          <button 
            onClick={()=> showSelected(language)} 
            style={language === selectedLanguage? {color: "blue"}: null} 
            className='btn-clear nav-link'>{language}
          </button>
        </li>
      ))
    }
  </ul>
  )
}
