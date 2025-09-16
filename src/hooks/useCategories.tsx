import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import categories from '../assets/data/category.json'

export default function useCategories() {
  const {data, isLoading} = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => {
        const res = axios.get(categories)
        console.log(res)
    }
  })

  return {data}
}
