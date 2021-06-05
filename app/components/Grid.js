import CardColumns from 'react-bootstrap/CardColumns';
import CardView from './Cards';
import  React from 'react';

export default function ReposGrid ({ repos }) {;
  return (
    <CardColumns> {
      repos.map(( repo, index ) => 
      {
        repo["index"] = index+1;
        return (
          <CardView key={index} {...{repo}}>
          </CardView>
        )
      })
      }
    </CardColumns>
  )
}
