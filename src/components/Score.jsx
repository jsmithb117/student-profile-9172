const Score = (props) => (
  <div className="score">
    <span className="score-order">
      {`Test ${props.order}:`}
    </span>
    <span className="score-score">
      {`${props.score}%`}
    </span>
  </div>
);

export default Score;
