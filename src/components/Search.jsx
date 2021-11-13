const Search = (props) => {
  return (
    <div className={props.class}>
      <form>
        <input
          type="text"
          value={props.searchText || ''}
          placeholder={props.placeHolder}
          onChange={(e) => props.setSearchText(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default Search;
