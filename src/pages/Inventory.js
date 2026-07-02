import {
  useEffect,
  useState,
  useContext
} from 'react';

import Sidebar from '../components/Sidebar';

import {
  addProduct,
  getProducts
} from '../services/inventoryService';

import {
  ThemeContext
} from '../context/ThemeContext';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

import {
  FaBoxesStacked,
  FaWarehouse,
  FaIndianRupeeSign,
  FaTriangleExclamation,
  FaClock,
  FaTruck
} from 'react-icons/fa6';

function Inventory() {

  const [products, setProducts] =
    useState([]);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [formData, setFormData] =
    useState({
      productName: '',
      quantity: '',
      price: '',
      supplier: ''
    });

  const {
    darkMode
  } = useContext(ThemeContext);

  // FETCH PRODUCTS

  const fetchProducts =
    async () => {

      try {

        const response =
          await getProducts();

        setProducts(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchProducts();

  }, []);

  // REAL TIME

  useEffect(() => {

    const timer =
      setInterval(() => {

        fetchProducts();

        setCurrentTime(
          new Date()
        );

      }, 5000);

    return () =>
      clearInterval(timer);

  }, []);

  // TOTALS

  const totalProducts =
    products.length;

  const totalStock =
    products.reduce(
      (acc, item) =>

        acc +
        Number(item.quantity),

      0
    );

  const inventoryValue =
    products.reduce(
      (acc, item) =>

        acc +
        (
          Number(item.quantity) *
          Number(item.price)
        ),

      0
    );

  const lowStockProducts =
    products.filter(
      item =>
        item.quantity < 10
    ).length;

  // PIE CHART

  const pieData = [

    {
      name: 'In Stock',
      value:
        totalStock -
        lowStockProducts
    },

    {
      name: 'Low Stock',
      value:
        lowStockProducts
    }

  ];

  const pieColors = [

    '#10b981',
    '#ef4444'

  ];

  // BAR CHART

  const chartData =
    products.map(item => ({

      name:
        item.productName,

      quantity:
        Number(item.quantity)

    }));

  // HANDLE CHANGE

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  // SUBMIT

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await addProduct(
          formData
        );

        fetchProducts();

        setFormData({

          productName: '',
          quantity: '',
          price: '',
          supplier: ''

        });

      } catch (error) {

        console.log(error);

      }

    };

  // CARD STYLE

  const cardStyle = {

    background:

      darkMode
        ? '#0f172a'
        : 'white',

    borderRadius: '28px',

    padding: '25px',

    border:

      darkMode
        ? '1px solid rgba(255,255,255,0.08)'
        : '1px solid #e2e8f0',

    boxShadow:

      darkMode

        ? '0px 10px 30px rgba(0,0,0,0.4)'

        : '0px 10px 30px rgba(0,0,0,0.06)'
  };

  return (

    <div
      style={{
        display: 'flex',

        background:

          darkMode
            ? '#020617'
            : '#f1f5f9',

        minHeight: '100vh'
      }}
    >

      <Sidebar />

      <div
        style={{
          marginLeft:

            window.innerWidth <= 768

              ? '0'

              : '270px',

          width: '100%',

          padding:

            window.innerWidth <= 768

              ? '90px 15px 30px'

              : '35px'
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: 'flex',

            justifyContent:
              'space-between',

            alignItems:
              'center',

            flexWrap: 'wrap',

            gap: '20px',

            marginBottom: '35px'
          }}
        >

          <div>

            <h1
              style={{
                margin: 0,

                fontSize: '44px',

                fontWeight: '800',

                color:

                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              Inventory Dashboard

            </h1>

            <p
              style={{
                marginTop: '10px',

                color:
                  '#64748b'
              }}
            >

              Smart warehouse and stock management system

            </p>

          </div>

          {/* CLOCK */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',

                alignItems:
                  'center',

                gap: '15px'
              }}
            >

              <FaClock
                size={22}
                color="#3b82f6"
              />

              <div>

                <h3
                  style={{
                    margin: 0
                  }}
                >

                  {

                    currentTime
                      .toLocaleTimeString()

                  }

                </h3>

                <p
                  style={{
                    margin: 0,

                    color:
                      '#64748b'
                  }}
                >

                  {

                    currentTime
                      .toDateString()

                  }

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',

            gap: '25px',

            marginBottom: '35px'
          }}
        >

          <InventoryCard
            title="Products"
            value={totalProducts}
            icon={
              <FaBoxesStacked />
            }
            color="#3b82f6"
            cardStyle={cardStyle}
          />

          <InventoryCard
            title="Total Stock"
            value={totalStock}
            icon={
              <FaWarehouse />
            }
            color="#10b981"
            cardStyle={cardStyle}
          />

          <InventoryCard
            title="Inventory Value"
            value={`₹${inventoryValue}`}
            icon={
              <FaIndianRupeeSign />
            }
            color="#8b5cf6"
            cardStyle={cardStyle}
          />

          <InventoryCard
            title="Low Stock"
            value={lowStockProducts}
            icon={
              <FaTriangleExclamation />
            }
            color="#ef4444"
            cardStyle={cardStyle}
          />

        </div>

        {/* CHARTS */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:

              window.innerWidth <= 1024

                ? '1fr'

                : '1fr 1fr',

            gap: '25px',

            marginBottom: '35px'
          }}
        >

          {/* BAR CHART */}

          <div style={cardStyle}>

            <h2>
              Product Stock Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart
                data={chartData}
              >

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="quantity"
                  radius={[
                    12,
                    12,
                    0,
                    0
                  ]}
                >

                  {

                    chartData.map(
                      (
                        entry,
                        index
                      ) => {

                        const colors = [

                          '#3b82f6',
                          '#10b981',
                          '#f59e0b',
                          '#ef4444',
                          '#8b5cf6',
                          '#06b6d4',
                          '#ec4899'

                        ];

                        return (

                          <Cell
                            key={index}
                            fill={
                              colors[
                                index %
                                colors.length
                              ]
                            }
                          />

                        );

                      }
                    )

                  }

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div style={cardStyle}>

            <h2>
              Stock Status
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {

                    pieData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            pieColors[
                              index
                            ]
                          }
                        />

                      )
                    )

                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}

          style={{
            ...cardStyle,

            marginBottom:
              '35px'
          }}
        >

          <h2
            style={{
              marginBottom:
                '25px'
            }}
          >

            Add Product
          </h2>

          <div
            style={{
              display: 'grid',

              gridTemplateColumns:
                'repeat(auto-fit,minmax(250px,1fr))',

              gap: '20px'
            }}
          >

            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="supplier"
              placeholder="Supplier"
              value={formData.supplier}
              onChange={handleChange}
              style={inputStyle}
            />

          </div>

          <button
            type="submit"

            style={{
              marginTop: '20px',

              padding:
                '14px 24px',

              background:
                'linear-gradient(135deg,#3b82f6,#2563eb)',

              color: 'white',

              border: 'none',

              borderRadius:
                '16px',

              cursor: 'pointer',

              fontWeight:
                '600',

              fontSize: '15px'
            }}
          >

            Add Product

          </button>

        </form>

        {/* PRODUCT CARDS */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(320px,1fr))',

            gap: '25px'
          }}
        >

          {

            products
              .slice()
              .reverse()
              .map((item) => (

                <div
                  key={item._id}

                  style={{

                    position: 'relative',

                    overflow: 'hidden',

                    borderRadius: '28px',

                    padding: '25px',

                    background:

                      darkMode

                        ? 'linear-gradient(145deg,#0f172a,#111827)'

                        : 'linear-gradient(145deg,#ffffff,#f8fafc)',

                    border:

                      darkMode

                        ? '1px solid rgba(255,255,255,0.08)'

                        : '1px solid rgba(0,0,0,0.05)',

                    boxShadow:

                      darkMode

                        ? '0px 10px 35px rgba(0,0,0,0.45)'

                        : '0px 10px 35px rgba(0,0,0,0.08)'
                  }}
                >

                  {/* GLOW */}

                  <div
                    style={{

                      position: 'absolute',

                      top: '-30px',

                      right: '-30px',

                      width: '120px',

                      height: '120px',

                      borderRadius: '50%',

                      background:

                        item.quantity < 10

                          ? 'rgba(239,68,68,0.15)'

                          : 'rgba(59,130,246,0.15)'
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',

                      justifyContent:
                        'space-between',

                      alignItems:
                        'center',

                      marginBottom:
                        '20px'
                    }}
                  >

                    <h2
                      style={{
                        margin: 0
                      }}
                    >

                      {
                        item.productName
                      }

                    </h2>

                    <div
                      style={{

                        padding:
                          '8px 14px',

                        borderRadius:
                          '30px',

                        background:

                          item.quantity < 10

                            ? '#fee2e2'

                            : '#dcfce7',

                        color:

                          item.quantity < 10

                            ? '#991b1b'

                            : '#166534',

                        fontWeight:
                          '600'
                      }}
                    >

                      {

                        item.quantity < 10

                          ? 'Low Stock'

                          : 'Available'

                      }

                    </div>

                  </div>

                  <h1
                    style={{
                      color:
                        '#3b82f6',

                      marginBottom:
                        '20px'
                    }}
                  >

                    ₹{item.price}

                  </h1>

                  <div
                    style={{
                      display: 'flex',

                      justifyContent:
                        'space-between'
                    }}
                  >

                    <div>

                      <p
                        style={{
                          color:
                            '#64748b'
                        }}
                      >

                        Quantity

                      </p>

                      <strong>
                        {
                          item.quantity
                        }
                      </strong>

                    </div>

                    <div>

                      <p
                        style={{
                          color:
                            '#64748b'
                        }}
                      >

                        Supplier

                      </p>

                      <strong>
                        {
                          item.supplier
                        }
                      </strong>

                    </div>

                  </div>

                  <div
                    style={{
                      marginTop: '20px',

                      display: 'flex',

                      alignItems:
                        'center',

                      gap: '10px',

                      color:
                        '#64748b'
                    }}
                  >

                    <FaTruck />

                    <span>
                      Real-time inventory tracking enabled
                    </span>

                  </div>

                </div>

              ))

          }

        </div>

      </div>

    </div>

  );

}

// SUMMARY CARD

function InventoryCard({

  title,
  value,
  icon,
  color,
  cardStyle

}) {

  return (

    <div style={cardStyle}>

      <div
        style={{
          display: 'flex',

          justifyContent:
            'space-between',

          alignItems:
            'center'
        }}
      >

        <div>

          <p
            style={{
              color:
                '#64748b'
            }}
          >

            {title}

          </p>

          <h1
            style={{
              margin: 0
            }}
          >

            {value}

          </h1>

        </div>

        <div
          style={{
            width: '65px',

            height: '65px',

            borderRadius:
              '18px',

            background: color,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',

            color: 'white',

            fontSize: '24px'
          }}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}

// INPUT STYLE

const inputStyle = {

  width: '100%',

  padding: '15px',

  borderRadius: '14px',

  border:
    '1px solid #cbd5e1',

  outline: 'none',

  fontSize: '15px',

  boxSizing: 'border-box'
};

export default Inventory;