import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import makeAnimated from "react-select/animated";
import { useDispatch } from "react-redux";
import { filterHand2 } from "../actions";
const animatedComponents = makeAnimated();

const date = new Date();
const current_year = date.getFullYear();
var current_date = date.getDate();

var current_month = date.getMonth() + 1;
if (current_month < 10) {
  current_month = `0${current_month}`;
}
if (current_date < 10) {
  current_date = `0${current_date}`;
}
const current_year_and_month_and_day = `${current_year}-${current_month}-${current_date}`;
//console.log(current_year_and_month_and_day);
const allAwailableYears = [];

//get an aray with years bewean current year and 1874
var currentYear = current_year;
while (currentYear >= 1874) {
  allAwailableYears.push(currentYear--);
}

function Filter() {
  //const isFilter = useSelector(state => state.Filter);
  const dispatch = useDispatch();

  const Genres = [
    { label: "Action", value: "28", name: "with_genres" },
    { label: "Adventure", value: "12", name: "with_genres" },
    { label: "Animation", value: "16", name: "with_genres" },
    { label: "Comedy", value: "35", name: "with_genres" },
    { label: "Crime", value: "80", name: "with_genres" },
    { label: "Documentary", value: "99", name: "with_genres" },
    { label: "Drama", value: "18", name: "with_genres" },
    { label: "Family", value: "10751", name: "with_genres" },
    { label: "Fantasy", value: "14", name: "with_genres" },
    { label: "History", value: "36", name: "with_genres" },
    { label: "Horror", value: "27", name: "with_genres" },
    { label: "Music", value: "10402", name: "with_genres" },
    { label: "Mystery", value: "9648", name: "with_genres" },
    { label: "Romance", value: "10749", name: "with_genres" },
    { label: "Science Fiction", value: "878", name: "with_genres" },
    { label: "TV Movie", value: "10770", name: "with_genres" },
    { label: "Thriller", value: "53", name: "with_genres" },
    { label: "War Movie", value: "10752", name: "with_genres" },
    { label: "Western", value: "37", name: "with_genres" }
  ];

  const Genres2 = [
    { label: "Action", value: "28", name: "without_genres" },
    { label: "Adventure", value: "12", name: "without_genres" },
    { label: "Animation", value: "16", name: "without_genres" },
    { label: "Comedy", value: "35", name: "without_genres" },
    { label: "Crime", value: "80", name: "without_genres" },
    { label: "Documentary", value: "99", name: "without_genres" },
    { label: "Drama", value: "18", name: "without_genres" },
    { label: "Family", value: "10751", name: "without_genres" },
    { label: "Fantasy", value: "14", name: "without_genres" },
    { label: "History", value: "36", name: "without_genres" },
    { label: "Horror", value: "27", name: "without_genres" },
    { label: "Music", value: "10402", name: "without_genres" },
    { label: "Mystery", value: "9648", name: "without_genres" },
    { label: "Romance", value: "10749", name: "without_genres" },
    { label: "Science Fiction", value: "878", name: "without_genres" },
    { label: "TV Movie", value: "10770", name: "without_genres" },
    { label: "Thriller", value: "53", name: "without_genres" },
    { label: "War Movie", value: "10752", name: "without_genres" },
    { label: "Western", value: "37", name: "without_genres" }
  ];

  const ratings = [
    { label: "10⭐", value: "10" },
    { label: "9⭐", value: "9" },
    { label: "8⭐", value: "8" },
    { label: "7⭐", value: "7" },
    { label: "6⭐", value: "6" },
    { label: "5⭐", value: "5" },
    { label: "4⭐", value: "4" },
    { label: "3⭐", value: "3" },
    { label: "2⭐", value: "2" },
    { label: "1⭐", value: "1" }
  ];

  const ratingsCount = [
    { label: "50🙂", value: "50" },
    { label: "100😎", value: "100" },
    { label: "500😁", value: "500" },
    { label: "1000🤩", value: "1000" },
    { label: "2000✨", value: "2000" }
  ];

  
  const [filterValue, setFilterValue] = useState({
    order: "popularity.desc",
    year: "",
    greater_than_release_date: "1874-01-01",
    lower_than_release_date: current_year_and_month_and_day,
    greater_than_rating_count: "0",
    lower_than_rating_count: "",
    greater_than_rating: "0",
    lower_than_rating: "",
    with_genres: [],
    without_genres: [],
    language: ""
  });

  function filterHandle(event) {
    const { name, value } = event.target;
    setFilterValue({
      ...filterValue,
      [name]: value
    });
  }
  function filterHandle2(event) {
   
    if (event === null) {
      event = filterValue.without_genres;
    }

    const array_with_movie_genres = event.map(obj => obj.value);
    setFilterValue({
      ...filterValue,
      without_genres: array_with_movie_genres
    });

    /*
    try {
      const { name } = event[0];
      if (name) {
        setFilterValue({
          ...filterValue,
          [name]: array_with_movie_genres
        });
      }
    } catch (error) {
      console.log("onChange error");
    }*/
  }

  function filterHandle3(event) {
    
    if (event === null) {
      event = filterValue.with_genres;
    }

    const array_with_movie_genres = event.map(obj => obj.value);
    setFilterValue({
      ...filterValue,
      with_genres: array_with_movie_genres
    });

  }

  //pass filterValue state to redux
  useEffect(() => {
    dispatch(filterHand2(filterValue));
    // eslint-disable-next-line
  },[filterValue]);
  

  return (
    <> 
      <ul className="mycontainer">
        <li>
          <select
            onChange={filterHandle}
            className="round-inbox-borders"
            name="order"
          >
            <option value="popularity.desc">Popularity descending</option>
            <option value="popularity.asc">Popularity ascending</option>
            <option value="release_date.desc">Release date descending</option>
            <option value="release_date.asc">Release date ascending</option>
            <option value="revenue.desc">Revenue descending</option>
            <option value="revenue.asc">Revenue ascending</option>
            <option value="primary_release_date.desc">
              Release date descending
            </option>
            <option value="primary_release_date.asc">
              Release date ascending
            </option>
            <option value="original_title.desc">Title descending</option>
            <option value="original_title.asc">Title ascending</option>
            <option value="vote_average.desc">Rating descending</option>
            <option value="vote_average.asc">Rating ascending</option>
            <option value="vote_count.desc">Ratings count descending</option>
            <option value="vote_count.asc">Ratings count ascending</option>
          </select>
        </li>
        <li>
          <select
            onChange={filterHandle}
            name="year"
            value={filterValue.year}
            className="round-inbox-borders"
          >
            <option value="">Year</option>
            {allAwailableYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </li>

        <li>
          <select
            onChange={filterHandle}
            name="greater_than_release_date"
            value={filterValue.greater_than_release_date}
            className="round-inbox-borders"
          >
            <option value="1874-01-01">Release after</option>
            {allAwailableYears.map(year => (
              <option key={year} value={`${year}-01-01`}>
                {year}
              </option>
            ))}
          </select>
        </li>

        <li>
          <select
            onChange={filterHandle}
            name="lower_than_release_date"
            value={filterValue.lower_than_release_date}
            className="round-inbox-borders"
          >
            <option value={current_year_and_month_and_day}>
              Release before
            </option>
            {allAwailableYears.map(year => (
              <option key={year} value={`${year}-01-01`}>
                {year}
              </option>
            ))}
          </select>
        </li>

        <li>
          <select
            onChange={filterHandle}
            name="greater_than_rating_count"
            value={filterValue.greater_than_rating_count}
            className="round-inbox-borders"
          >
            <option value="0">Min Votes</option>
            {ratingsCount.map(rating => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </li>

        <li>
          <select
            onChange={filterHandle}
            name="lower_than_rating_count"
            value={filterValue.lower_than_rating_count}
            className="round-inbox-borders"
          >
            <option value="">Max Votes</option>
            {ratingsCount.map(rating => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </li>

        <li>
          <select
            onChange={filterHandle}
            name="greater_than_rating"
            value={filterValue.greater_than_rating}
            className="round-inbox-borders"
          >
            <option value="0">Min rating</option>
            {ratings.map(rating => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </li>

        <li>
          <select
            onChange={filterHandle}
            name="lower_than_rating"
            value={filterValue.lower_than_rating}
            className="round-inbox-borders"
          >
            <option value="">Max rating</option>
            {ratings.map(rating => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </li>

        <li>
          <select
            className="round-inbox-borders"
            onChange={filterHandle}
            name="language"
            value={filterValue.language}
          >
            <option value="">Language</option>
            <option value="ab">Abkhazian</option>
            <option value="aa">Afar</option>
            <option value="af">Afrikaans</option>
            <option value="ak">Akan</option>
            <option value="sq">Albanian</option>
            <option value="am">Amharic</option>
            <option value="ar">Arabic</option>
            <option value="an">Aragonese</option>
            <option value="hy">Armenian</option>
            <option value="as">Assamese</option>
            <option value="av">Avaric</option>
            <option value="ea">Avestan</option>
            <option value="ay">Aymara</option>
            <option value="az">Azerbaijani</option>
            <option value="bm">Bambara</option>
            <option value="ba">Bashkir</option>
            <option value="eu">Basque</option>
            <option value="be">Belarusian</option>
            <option value="bn">Bengali (Bangla)</option>
            <option value="bh">Bihari</option>
            <option value="bi">Bislama</option>
            <option value="bs">Bosnian</option>
            <option value="br">Breton</option>
            <option value="bg">Bulgarian</option>
            <option value="my">Burmese</option>
            <option value="ca">Catalan</option>
            <option value="ch">Chamorro</option>
            <option value="ce">Chechen</option>
            <option value="ny">Chichewa, Chewa, Nyanja</option>
            <option value="zh">Chinese</option>
            <option value="cv">Chuvash</option>
            <option value="kw">Cornish</option>
            <option value="co">Corsican</option>
            <option value="cr">Cree</option>
            <option value="hr">Croatian</option>
            <option value="cs">Czech</option>
            <option value="da">Danish</option>
            <option value="dv">Divehi, Dhivehi, Maldivian</option>
            <option value="nl">Dutch</option>
            <option value="dz">Dzongkha</option>
            <option value="en">English</option>
            <option value="eo">Esperanto</option>
            <option value="et">Estonian</option>
            <option value="ee">Ewe</option>
            <option value="fo">Faroese</option>
            <option value="fj">Fijian</option>
            <option value="fi">Finnish</option>
            <option value="fr">French</option>
            <option value="ff">Fula, Fulah, Pulaar, Pular</option>
            <option value="gl">Galician</option>
            <option value="gd">Gaelic (Scottish)</option>
            <option value="gv">Gaelic (Manx)</option>
            <option value="ka">Georgian</option>
            <option value="de">German</option>
            <option value="el">Greek</option>
            <option value="kl">Greenlandic</option>
            <option value="gn">Guarani</option>
            <option value="gu">Gujarati</option>
            <option value="ht">Haitian Creole</option>
            <option value="ha">Hausa</option>
            <option value="he">Hebrew</option>
            <option value="hz">Herero</option>
            <option value="hi">Hindi</option>
            <option value="ho">Hiri Motu</option>
            <option value="hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="io">Ido</option>
            <option value="ig">Igbo</option>
            <option value="id">Indonesian </option>
            <option value="ia">Interlingua</option>
            <option value="ie">Interlingue</option>
            <option value="iu">Inuktitut</option>
            <option value="ik">Inupiak</option>
            <option value="ga">Irish</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="jv">Javanese</option>
            <option value="kl">Kalaallisut, Greenlandic</option>
            <option value="kn">Kannada</option>
            <option value="kr">Kanuri</option>
            <option value="ks">Kashmiri</option>
            <option value="kk">Kazakh</option>
            <option value="km">Khmer</option>
            <option value="ki">Kikuyu</option>
            <option value="rw">Kinyarwanda (Rwanda)</option>
            <option value="rn">Kirundi</option>
            <option value="ky">Kyrgyz</option>
            <option value="kv">Komi</option>
            <option value="kg">Kongo</option>
            <option value="ko">Korean</option>
            <option value="ku">Kurdish</option>
            <option value="kj">Kwanyama</option>
            <option value="lo">Lao</option>
            <option value="la">Latin</option>
            <option value="lv">Latvian (Lettish)</option>
            <option value="li">Limburgish ( Limburger)</option>
            <option value="ln">Lingala</option>
            <option value="lt">Lithuanian</option>
            <option value="lu">Luga-Katanga</option>
            <option value="lg">Luganda, Ganda</option>
            <option value="lb">Luxembourgish</option>
            <option value="gv">Manx</option>
            <option value="mk">Macedonian</option>
            <option value="mg">Malagasy</option>
            <option value="ms">Malay</option>
            <option value="ml">Malayalam</option>
            <option value="mt">Maltese</option>
            <option value="mi">Maori</option>
            <option value="mr">Marathi</option>
            <option value="mh">Marshallese</option>
            <option value="mo">Moldavian</option>
            <option value="mn">Mongolian</option>
            <option value="na">Nauru</option>
            <option value="nv">Navajo</option>
            <option value="ng">Ndonga</option>
            <option value="nd">Northern Ndebele</option>
            <option value="ne">Nepali</option>
            <option value="no">Norwegian</option>
            <option value="nb">Norwegian bokmål</option>
            <option value="nn">Norwegian nynorsk</option>
            <option value="ii">Nuosu</option>
            <option value="oc">Occitan</option>
            <option value="oj">Ojibwe</option>
            <option value="cu">Old Church Slavonic, Old Bulgarian</option>
            <option value="or">Oriya</option>
            <option value="om">Oromo (Afaan Oromo)</option>
            <option value="os">Ossetian</option>
            <option value="pi">Pāli</option>
            <option value="ps">Pashto, Pushto</option>
            <option value="fa">Persian (Farsi)</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="pa">Punjabi (Eastern)</option>
            <option value="qu">Quechua</option>
            <option value="rm">Romansh</option>
            <option value="ro">Romanian</option>
            <option value="ru">Russian</option>
            <option value="se">Sami</option>
            <option value="sm">Samoan</option>
            <option value="sg">Sango</option>
            <option value="sa">Sanskrit</option>
            <option value="sr">Serbian</option>
            <option value="sh">Serbo-Croatian</option>
            <option value="st">Sesotho</option>
            <option value="tn">Setswana</option>
            <option value="sn">Shona</option>
            <option value="Yi">Sichuan</option>
            <option value="sd">Sindhi</option>
            <option value="si">Sinhalese</option>
            <option value="ss">Siswati</option>
            <option value="sk">Slovak</option>
            <option value="sl">Slovenian</option>
            <option value="so">Somali</option>
            <option value="nr">Southern Ndebele</option>
            <option value="es">Spanish</option>
            <option value="su">Sundanese</option>
            <option value="sw">Swahili (Kiswahili)</option>
            <option value="ss">Swati</option>
            <option value="sv">Swedish</option>
            <option value="tl">Tagalog</option>
            <option value="ty">Tahitian</option>
            <option value="tg">Tajik</option>
            <option value="ta">Tamil</option>
            <option value="tt">Tatar</option>
            <option value="te">Telugu</option>
            <option value="th">Thai</option>
            <option value="bo">Tibetan</option>
            <option value="ti">Tigrinya</option>
            <option value="to">Tonga</option>
            <option value="ts">Tsonga</option>
            <option value="tr">Turkish</option>
            <option value="tk">Turkmen</option>
            <option value="tw">Twi</option>
            <option value="ug">Uyghur</option>
            <option value="uk">Ukrainian</option>
            <option value="ur">Urdu</option>
            <option value="uz">Uzbek</option>
            <option value="ve">Venda</option>
            <option value="vi">Vietnamese</option>
            <option value="vo">Volapük</option>
            <option value="wa">Wallon</option>
            <option value="cy">Welsh</option>
            <option value="wo">Wolof</option>
            <option value="fy">Western Frisian</option>
            <option value="xh">Xhosa</option>
            <option value="yi">Yiddish</option>
            <option value="yo">Yoruba</option>
            <option value="za">Zhuang, Chuang</option>
            <option value="zu">Zulu</option>
          </select>
        </li>
      </ul>

      <div className="container mycontainer2">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Select
              name="with_genres"
              onChange={filterHandle3}
              options={Genres}
              components={animatedComponents}
              isMulti
              placeholder="With genres"
            />
          </div>

          <div className="col-lg-6 col-sm-12">
            <Select
              name="without_genres"
              onChange={filterHandle2}
              options={Genres2}
              components={animatedComponents}
              isMulti
              placeholder="Without genres"
            />
          </div>
        </div>
      </div>     
    </>
  );
}

export default Filter;
