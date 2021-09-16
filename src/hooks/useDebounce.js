
export default function useDebounce() {

  let timeout = "";

  function debounce(func, wait = 1000) {
    clearTimeout(parseInt(timeout));
    timeout =  setTimeout(func, wait);
  }

  return debounce;
}
