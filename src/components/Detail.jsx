const Detail = (props) => (
  <div className={props.class}>{`${props.title}: ${props.value}`}</div>
);

export default Detail;