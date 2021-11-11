const SearchByName = (props) => {
  return (
    <div className="search-by-name">
      <form>
        <input
          type="text"
          value={props.searchText}
          onChange={(e) => props.setSearchText(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default SearchByName;
