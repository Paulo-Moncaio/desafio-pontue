import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CardRedacao({ id }) {
  const [redacao, setRedacao] = useState({})
  const classes = useStyles();

  const carregaRedacao = async () => {
    await api.get(`/redacao/${id.redacao}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } })
      .then((res) => {
        setRedacao(res.data.data);
      });
  }

  useEffect(() => {
    carregaRedacao();
  }, []);
  console.log(redacao)
  console.log(id.redacao)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image={redacao.urls[0].url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {redacao.aluno.nome_completo}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {redacao.created_at}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Vizualizar
        </Button>
        <Button size="small" color="primary">
          Excluir
        </Button>
      </CardActions>
    </Card>
  )
}
