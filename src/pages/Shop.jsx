import React from "react";
import Sidebar from "../components/sidebar";

const Shop = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ 
                marginLeft: '240px', 
                padding: '20px', 
                width: 'calc(100% - 240px)',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Cửa hàng
                </h2>
                <p>Chức năng này đang được phát triển. Vui lòng quay lại sau!</p>
            </div>
        </div>
    );
}

export default Shop;