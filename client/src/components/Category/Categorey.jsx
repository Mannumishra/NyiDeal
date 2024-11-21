import React, { useState, useEffect } from 'react'
import axios from 'axios'
import View from './view.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {Link} from 'react-router-dom'
const Categorey = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/admin-get-categories`)
            const data = response.data.data
            setData(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
                {loading ? (
                    Array(18).fill(0).map((_, index) => (
                        <div key={index} className="flex w-32 h-32 rounded-[50%] flex-col items-center justify-center space-y-2">
                            <Skeleton circle={true} height={56} width={56} />
                            <Skeleton width={40} height={10} />
                        </div>
                    ))
                ) : (
                    <>
                        {data.slice(0, 18).map((category, index) => (
                            <div key={index} className="flex border-2 w-32 h-32 shadow-sm rounded-[50%] flex-col items-center justify-center space-y-2">
                                <Link to={`/Post-by-categories?filter=Categories&Name=${encodeURIComponent(category.CategoriesName)}`} className="text-center">
                                <img src={category.CategoriesImage.imageUrl} alt={category.CategoriesName} loading="lazy" className="h-14 transition-all ease-in-out hover:scale-[1.05] w-14 object-contain mx-auto" />
                                    <p className="text-sm cursor-pointer font-bold mt-2">{category.CategoriesName}</p>
                                </Link>
                            </div>
                        ))}
                        {data.length > 18 && (
                            <div key="view-all" className="flex border-2 w-32 h-32 shadow-sm rounded-[50%] flex-col items-center justify-center space-y-2">
                                <a href="/View-All" className="text-center">
                                    <img src={View} alt="View All" loading="lazy" className="h-14 transition-all ease-in-out hover:scale-[1.05] w-14 object-contain mx-auto" />
                                    <p className="text-sm cursor-pointer font-bold mt-2">View All</p>
                                </a>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Categorey