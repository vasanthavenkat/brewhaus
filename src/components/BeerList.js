import React, {useEffect, useState} from 'react';
import {api} from '../api/punk-api';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
    borderRadius: 16
  },
  media: {
    margin: 10,
    height: 250,
    width: 60,
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  button: {
    justifyContent: 'flex-end'
  },
  pagination: {
    display: 'flex',
    height: 25,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: '#e0e0e0'
  },
}));

export default function BeerList({location: {search}}) {
  const perPage = 24;
  const classes = useStyles();
  const [beers, setBeers] = useState([]);
  const [page, setPage] = useState(1);
  const [beersStatus, setBeersStatus] = useState('loading')

  useEffect(() => {
    async function fetchBeers() {
      try {
        const beerList = await api.getBeers({page: page, perPage, beerName: search});
        setBeers(beerList)
        setBeersStatus('loaded')
      } catch (e) {
        console.error(e)
        setBeersStatus(e.message)
      }
    }

    fetchBeers().catch(console.error)
  }, [search, page])

  if (beersStatus === 'loading') {
    return (
      <div className={classes.spinner}>
        <CircularProgress/>
      </div>
    )
  } else if (beersStatus === 'loaded') {
    return (
      <Grid container spacing={2}>
        {beers.length ? beers.map((beer) => {
          return (
            <Grid item lg={4} md={6} key={beer.id}>
              <Card className={classes.root}>
                <div>
                  <CardMedia
                    className={classes.media}
                    image={beer.image_url ? beer.image_url : './beer.png'}
                    title={beer.name}
                  />
                </div>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {beer.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {beer.description}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.button}>
                    <Link to={`/brewhaus/beer-details/${beer.id}`}>
                      <Button size="small" color="primary">
                        VIEW DETAILS
                      </Button>
                    </Link>
                  </CardActions>
                </div>
              </Card>
            </Grid>
          )
        }) : <Typography variant='h2' color='textSecondary'> Oops! No beers found </Typography>}
        <Card className={classes.pagination}>
          <Button
            color="primary"
            startIcon={<ArrowBackIosIcon/>}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous page
          </Button>
          <Button
            color="primary"
            endIcon={<ArrowForwardIosIcon/>}
            onClick={() => setPage(page + 1)}
            disabled={beers.length !== perPage}
          >
            Next page
          </Button>
        </Card>
      </Grid>
    )
  } else {
    return <Typography>{beersStatus}</Typography>
  }
}
