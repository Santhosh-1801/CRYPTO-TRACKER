import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' 
import { CryptoState } from '../Cryptocontext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from './../Components/CoinsTable';

const Coin = () => {

  const {id}=useParams(); 
  const [coins,setCoins]=useState();  

  const {currency,symbol}=CryptoState(); 

  const fetchCoin=async()=>{
    const {data}= await axios.get(SingleCoin(id));
    setCoins(data);
  }
  useEffect(()=>{
    fetchCoin();
  },[]) 

  const useStyles=makeStyles((theme)=>({
    container:{
      display:"flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  })) 

  const classes=useStyles();

  if (!coins) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <>
    <div className={classes.container}>
      <div className={classes.sidebar}> 
      <img src={coins?.image.large} alt={coins?.name} height={"200"} style={{marginBottom:20}}/> 
      <Typography variant="h3" className={classes.heading}>
          {coins?.name}
      </Typography>
      <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coins?.description.en.split(". ")[0])}.
      </Typography>
      <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coins?.market_cap_rank.toString()}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {
                numberWithCommas(coins?.market_data.current_price[currency.toLowerCase()])
              }
            </Typography>
            </span>
            <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coins?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
      </div>
      </div>
      <CoinInfo coins={coins}/>
      </div>
    </>
  )
}

export default Coin