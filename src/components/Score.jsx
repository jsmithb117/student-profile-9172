const Score = (props) => (
  <span className="score">
    {`Test ${props.index}:     ${props.score}%`}
  </span>
);

export default Score;
