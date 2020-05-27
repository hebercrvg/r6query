import rankIcons from '../constants/RankIcons';

export const getRankIconByMMR = (mmr = 0) => {
  switch (true) {
    case mmr === 0:
      return rankIcons.none;
    case mmr >= 0 && mmr <= 1200:
      return rankIcons.copperV;
    case mmr > 1100 && mmr <= 1300:
      return rankIcons.copperIII;
    case mmr > 1200 && mmr <= 1400:
      return rankIcons.copperII;
    case mmr > 1300 && mmr <= 1500:
      return rankIcons.copperI;
    case mmr > 1500 && mmr <= 1700:
      return rankIcons.bronzeIV;
    case mmr > 1700 && mmr <= 1800:
      return rankIcons.bronzeIII;
    case mmr > 1800 && mmr <= 1900:
      return rankIcons.bronzeII;
    case mmr > 1900 && mmr <= 2000:
      return rankIcons.bronzeI;
    case mmr > 2000 && mmr <= 2200:
      return rankIcons.silverIV;
    case mmr > 2200 && mmr <= 2300:
      return rankIcons.silverIII;
    case mmr > 2300 && mmr <= 2400:
      return rankIcons.silverII;
    case mmr > 2400 && mmr <= 2500:
      return rankIcons.silverI;
    case mmr > 2500 && mmr <= 2600:
      return rankIcons.goldIII;
    case mmr > 2600 && mmr <= 2800:
      return rankIcons.goldII;
    case mmr > 2800 && mmr <= 3000:
      return rankIcons.goldI;
    case mmr > 3000 && mmr <= 3200:
      return rankIcons.platinumIII;
    case mmr > 3200 && mmr <= 3600:
      return rankIcons.platinumII;
    case mmr > 3600 && mmr <= 4000:
      return rankIcons.platinumI;
    case mmr > 4000 && mmr <= 4400:
      return rankIcons.diamond;
    case mmr > 4400:
      return rankIcons.champions;
    default:
      break;
  }
};
