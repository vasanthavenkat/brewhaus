import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import {api} from '../api/punk-api';
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingInline: 10
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function BeerDetails({match: {params: {beerId}}}) {
  const classes = useStyles();
  const [beerDetails, setBeerDetails] = useState();
  const [beerDetailsStatus, setBeerDetailsStatus] = useState('loading');

  useEffect(() => {
    async function fetchBeerDetails() {
      try {
        const beerDetails = await api.getBeerById(beerId);
        setBeerDetails(beerDetails)
        setBeerDetailsStatus('loaded');
      } catch (e) {
        console.error(e)
        const errorMessage = (e.message).includes('Request failed with status code 404') ? `Oops! No beer found that matches the ID ${beerId}` : e.message;
        setBeerDetailsStatus(errorMessage)
      }
    }

    fetchBeerDetails().catch()
  }, [beerId])

  if (beerDetailsStatus === 'loading') {
    return (
      <div className={classes.spinner}>
        <CircularProgress/>
      </div>
    )
  } else if (beerDetailsStatus === 'loaded') {
    return (
      <Paper className={classes.root}>
        <Typography variant="h5">
          {beerDetails.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {beerDetails.description}
        </Typography>
        <br/>
        <Typography variant="subtitle1">
          Fun Facts
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <li>
            First Brewed on {beerDetails.first_brewed}
          </li>
          <li>
            Alcohol by volume is {beerDetails.abv}%
          </li>
          <li>
            International Bitterness Units(IBU) of {beerDetails.ibu}
          </li>
          <li>
            Hops used {beerDetails.ingredients.hops.map(hop => hop.name).join(', ')}
          </li>
          <li>
            Malt used {beerDetails.ingredients.malt.map(malt => malt.name).join(', ')}
          </li>
          <li>
            Contributed by {beerDetails.contributed_by}
          </li>
          <li>
            Brewers tips: {beerDetails.brewers_tips}
          </li>
          <li>
            Pair with: {beerDetails.food_pairing.join('; ')}
          </li>
        </Typography>
      </Paper>
    )
  } else {
    return <Typography variant='h2' color='textSecondary'>{beerDetailsStatus}</Typography>
  }
}
