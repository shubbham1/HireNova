import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';

import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Data Engineer"
];

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate(`/browse?keyword=${query}`);
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">

        <CarouselContent>

          {
            category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3"
              >

                <Button
                  onClick={() => searchJobHandler(cat)}
                 className="rounded-full border border-gray-300 hover:bg-[#6A38C2] hover:text-white transition-all duration-300 ease-in-out hover:scale-105 shadow-sm"
                  variant="outline"
            
                >
                  {cat}
                </Button>

              </CarouselItem>
            ))
          }

        </CarouselContent>

        <CarouselPrevious className="hover:scale-110 transition-all duration-300 ease-in-out hover:bg-purple-700 hover:text-white" />
        <CarouselNext className="hover:scale-110 transition-all duration-300 ease-in-out hover:bg-purple-700 hover:text-white" />

      </Carousel>
    </div>
  );
};

export default CategoryCarousel;