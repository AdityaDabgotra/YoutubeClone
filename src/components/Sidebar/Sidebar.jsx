import React from 'react'
import './Sidebar.css'  

const Sidebar = ({sidebar,category,setCategory}) => {
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
        <div className="sortcut-links">
            <div className={`side-links ${category === 0?"active":""}`} onClick={()=>setCategory(0)}>
                <i class="fa-solid fa-house"></i><p>Home</p>
            </div>
            <div className={`side-links ${category === 20?"active":""}`} onClick={()=>setCategory(20)}>
                <i class="fa-solid fa-gamepad"></i><p>Gaming</p>
            </div>
            <div className={`side-links ${category === 2?"active":""}`} onClick={()=>setCategory(2)}>
                <i class="fa-solid fa-car-side"></i><p>Automobiles</p>
            </div>
            <div className={`side-links ${category === 17?"active":""}`} onClick={()=>setCategory(17)}>
                <i class="fa-solid fa-basketball"></i><p>Sports</p>
            </div>
            <div className={`side-links ${category === 24?"active":""}`} onClick={()=>setCategory(24)}>
                <i class="fa-solid fa-tv"></i><p>Entertainment</p>
            </div>
            <div className={`side-links ${category === 28?"active":""}`} onClick={()=>setCategory(28)}>
                <i class="fa-solid fa-microchip"></i><p>Technology</p>
            </div>
            <div className={`side-links ${category === 10?"active":""}`} onClick={()=>setCategory(10)}>
                <i class="fa-solid fa-music"></i><p>Music</p>
            </div>
            <div className={`side-links ${category === 22?"active":""}`} onClick={()=>setCategory(22)}>
                <i class="fa-solid fa-blog"></i><p>Blogs</p>
            </div>
            <div className={`side-links ${category === 25?"active":""}`} onClick={()=>setCategory(25)}>
                <i class="fa-solid fa-newspaper"></i><p>News</p>
            </div>
            <hr />
        </div>
        <div className="subscribed-list">
            <h3>Subscribed</h3>
            <div className="side-links">
                <img src="//yt3.ggpht.com/vik8mAiwHQbXiFyKfZ3__p55_VBdGvwxPpuPJBBwdbF0PjJxikXhrP-C3nLQAMAxGNd_-xQCIg=s176-c-k-c0x00ffffff-no-rj-mo" alt="" /><p>PewDiePie</p>
            </div>
            <div className="side-links">
                <img src="//yt3.ggpht.com/nxYrc_1_2f77DoBadyxMTmv7ZpRZapHR5jbuYe7PlPd5cIRJxtNNEYyOC0ZsxaDyJJzXrnJiuDE=s176-c-k-c0x00ffffff-no-rj-mo" alt="" /><p>MrBeast</p>
            </div>
            <div className="side-links">
                <img src="https://yt3.googleusercontent.com/ytc/AIdro_ncDOZtOT-S5kW_ytro_LqN_ZSd-jF-RC5bAt9rmze3U84=s160-c-k-c0x00ffffff-no-rj" alt="" /><p>Justin Beiber</p>
            </div>
            <div className="side-links">
                <img src="//yt3.ggpht.com/qxMg7xnccD_tt-YtUTTK-ctCtUqUH9d3qKsbqm_DAti0nC7RHVbFlFiC6k8BoNS1O2O4ytAlZiE=s176-c-k-c0x00ffffff-no-rj-mo" alt="" /><p>FiveMinutes</p>
            </div>
            <div className="side-links">
                <img src="//yt3.ggpht.com/CbjwnQ0yWOKiTo3bP-V89hKhm_y1-s2NYpmRi3NAPUH0-VJ_h15g2fwVS3cFM06H8379YbcDCw=s176-c-k-c0x00ffffff-no-rj-mo" alt="" /><p>Nas Daily</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
