import ArrScaleQuiz from './components/ArrScaleQuiz'
import ArrFill from './components/ArrFill'
import { Button } from '@/components/ui/button'
import { IoIosArrowForward, IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { useMemo, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import ArrNumMatch from './components/ArrNumMatch'
import ArrFirstAndSecondNumber from './components/ArrFirstAndSecondNumber'
import ArrNumAddMulti from './components/ArrNumAddMulti'
import ArrNumAddMultiOptions from './components/ArrNumAddMultiOptions'

// Your data (kept exactly as you shared)
// const QUESTIONS_DATA = [
//   {
//     "id": 1,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 10.",
//       "steps": 10,
//       "answer1": 12,
//       "count": 5,
//       "defaultValue": 3,
//       "hint": "Tel telkens 10 bij elk getal op.",
//       "explanation": "Je telt telkens 10 op om naar het volgende getal te komen."
//     }
//   },
//   {
//     "id": 2,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen staan op deze lijn?",
//       "options": [12, 50, 34, 43, 63, 89, 99],
//       "hint": "Tel de getallen één voor één op de lijn af.",
//       "explanation": "Kijk naar de schaallijn en zoek de getallen die erop staan."
//     }
//   },
//   {
//     "id": 3,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan in deze vakken? Verbind ze met de schaallijn.",
//       "options": [12, 50, 34, 43, 63, 89],
//       "hint": "Verbind de getallen met de schaallijn door ze één voor één af te tellen.",
//       "explanation": "Je zoekt de getallen en verbindt ze met de juiste plek op de schaallijn."
//     }
//   },
//   {
//     "id": 4,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 10.",
//       "steps": 10,
//       "answer1": 45,
//       "count": 10,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 10 toe aan het getal.",
//       "explanation": "Je telt telkens 10 op bij het vorige getal."
//     }
//   },
//   {
//     "id": 5,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen komen overeen met de schaal?",
//       "options": [25, 56, 78, 34, 90],
//       "hint": "Kijk naar de schaallijn en match de getallen.",
//       "explanation": "Je moet de getallen vinden die op de schaal passen."
//     }
//   },
//   {
//     "id": 6,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan er in deze vakken? Verbind ze met de schaallijn.",
//       "options": [28, 30, 64, 13, 93, 79, 68, 45],
//       "hint": "Zoek de juiste getallen en verbind ze met de schaallijn.",
//       "explanation": "Tel de getallen één voor één en plaats ze op de juiste plek op de schaallijn."
//     }
//   },
//   {
//     "id": 7,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 20.",
//       "steps": 20,
//       "answer1": 100,
//       "count": 12,
//       "defaultValue": 0,
//       "hint": "Tel telkens 20 op bij het getal.",
//       "explanation": "Je telt telkens 20 op bij het getal."
//     }
//   },
//   {
//     "id": 8,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen passen er op deze schaal?",
//       "options": [12, 34, 59, 80, 120],
//       "hint": "Zoek de getallen die op de schaallijn passen.",
//       "explanation": "Match de getallen met de schaallijn."
//     }
//   },
//   {
//     "id": 9,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Vul de getallen in de lege vakken in.",
//       "steps": 10,
//       "answer1": 100,
//       "count": 15,
//       "defaultValue": 0,
//       "hint": "Je moet de getallen aanvullen op basis van het patroon.",
//       "explanation": "Voltooi het patroon door de juiste getallen in te vullen."
//     }
//   },
//   {
//     "id": 10,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 5.",
//       "steps": 5,
//       "answer1": 20,
//       "count": 10,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 5 toe aan het getal.",
//       "explanation": "Je telt telkens 5 op."
//     }
//   },
//   {
//     "id": 11,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen passen op deze schaal?",
//       "options": [12, 30, 50, 70],
//       "hint": "Tel de getallen één voor één op de schaallijn.",
//       "explanation": "Match de getallen met de schaal."
//     }
//   },
//   {
//     "id": 12,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 50.",
//       "steps": 50,
//       "answer1": 200,
//       "count": 10,
//       "defaultValue": 0,
//       "hint": "Tel telkens 50 op bij het getal.",
//       "explanation": "Je telt telkens 50 op bij het getal."
//     }
//   },
//   {
//     "id": 13,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen passen er op deze schaal?",
//       "options": [12, 36, 72, 104, 150],
//       "hint": "Zoek de getallen die op de schaallijn passen.",
//       "explanation": "Match de getallen met de schaallijn."
//     }
//   },
//   {
//     "id": 14,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 7.",
//       "steps": 7,
//       "answer1": 35,
//       "count": 12,
//       "defaultValue": 0,
//       "hint": "Tel telkens 7 op bij het getal.",
//       "explanation": "Je telt telkens 7 op bij het getal."
//     }
//   },
//   {
//     "id": 15,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen komen voor in de vakken? Verbind ze met de schaallijn.",
//       "options": [13, 22, 31, 40, 51],
//       "hint": "Verbind de getallen met de schaallijn.",
//       "explanation": "Zoek de getallen en plaats ze op de juiste plek op de schaallijn."
//     }
//   },
//   {
//     "id": 16,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan in deze vakken? Verbind ze met de schaallijn.",
//       "options": [18, 20, 30, 35, 44],
//       "hint": "Zoek de getallen en verbind ze met de schaallijn.",
//       "explanation": "Kijk goed naar de getallen en plaats ze op de juiste plek."
//     }
//   },
//   {
//     "id": 17,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 30.",
//       "steps": 30,
//       "answer1": 120,
//       "count": 8,
//       "defaultValue": 0,
//       "hint": "Tel telkens 30 op bij het getal.",
//       "explanation": "Je telt telkens 30 op bij het getal om naar het volgende getal te komen."
//     }
//   },
//   {
//     "id": 18,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 15.",
//       "steps": 15,
//       "answer1": 45,
//       "count": 10,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 15 toe aan het getal.",
//       "explanation": "Je telt telkens 15 op bij het getal."
//     }
//   },
//   {
//     "id": 19,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen passen er op de schaallijn?",
//       "options": [10, 20, 50, 100, 200],
//       "hint": "Verbind de getallen met de schaallijn.",
//       "explanation": "Plaats de getallen op de juiste plek op de schaallijn."
//     }
//   },
//   {
//     "id": 20,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen passen op deze lijn? Verbind ze met de schaallijn.",
//       "options": [10, 20, 30, 40, 50],
//       "hint": "Zoek de getallen en verbind ze met de schaallijn.",
//       "explanation": "Verbind de getallen met de juiste plaats op de schaallijn."
//     }
//   },
//   {
//     "id": 21,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 2.",
//       "steps": 2,
//       "answer1": 12,
//       "count": 10,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 2 toe aan het getal.",
//       "explanation": "Je telt telkens 2 op bij het getal."
//     }
//   },
//   {
//     "id": 22,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan er op de schaallijn? Verbind ze met de vakken.",
//       "options": [10, 20, 30, 40, 50],
//       "hint": "Zoek de getallen en verbind ze met de juiste vakken.",
//       "explanation": "Plaats de getallen op de juiste plekken."
//     }
//   },
//   {
//     "id": 23,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen passen er op deze schaal?",
//       "options": [15, 35, 50, 75, 100],
//       "hint": "Zoek de getallen die op de schaallijn passen.",
//       "explanation": "Verbind de getallen met de schaallijn."
//     }
//   },
//   {
//     "id": 24,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 20.",
//       "steps": 20,
//       "answer1": 60,
//       "count": 8,
//       "defaultValue": 0,
//       "hint": "Tel telkens 20 op bij het getal.",
//       "explanation": "Je telt telkens 20 op bij het getal."
//     }
//   },
//   {
//     "id": 25,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 25.",
//       "steps": 25,
//       "answer1": 125,
//       "count": 8,
//       "defaultValue": 0,
//       "hint": "Tel telkens 25 op bij het getal.",
//       "explanation": "Je telt telkens 25 op bij het getal."
//     }
//   },
//   {
//     "id": 26,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 10.",
//       "steps": 10,
//       "answer1": 20,
//       "count": 7,
//       "defaultValue": 0,
//       "hint": "Tel telkens 10 op bij het getal.",
//       "explanation": "Je telt telkens 10 op om naar het volgende getal te komen."
//     }
//   },
//   {
//     "id": 27,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan er in de vakken? Verbind ze met de schaallijn.",
//       "options": [17, 22, 39, 45, 50],
//       "hint": "Verbind de getallen met de schaallijn.",
//       "explanation": "Zoek de getallen en plaats ze op de juiste plek op de schaallijn."
//     }
//   },
//   {
//     "id": 28,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 5.",
//       "steps": 5,
//       "answer1": 25,
//       "count": 8,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 5 toe aan het getal.",
//       "explanation": "Je telt telkens 5 op bij het getal."
//     }
//   },
//   {
//     "id": 29,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen komen overeen met deze schaallijn?",
//       "options": [17, 38, 61, 74],
//       "hint": "Zoek de getallen die passen op de schaallijn.",
//       "explanation": "Kijk goed naar de schaallijn en vind de juiste getallen."
//     }
//   },
//   {
//     "id": 30,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 15.",
//       "steps": 15,
//       "answer1": 75,
//       "count": 6,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 15 toe aan het getal.",
//       "explanation": "Je telt telkens 15 op bij het getal."
//     }
//   },
//   {
//     "id": 31,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen passen er op deze schaal?",
//       "options": [10, 30, 60, 100, 120],
//       "hint": "Zoek de getallen die passen op de schaallijn.",
//       "explanation": "Kijk naar de schaallijn en plaats de getallen op de juiste plekken."
//     }
//   },
//   {
//     "id": 32,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 30.",
//       "steps": 30,
//       "answer1": 120,
//       "count": 7,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 30 toe aan het getal.",
//       "explanation": "Je telt telkens 30 op bij het getal."
//     }
//   },
//   {
//     "id": 33,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan op deze lijn? Verbind ze met de vakken.",
//       "options": [7, 15, 23, 30, 36],
//       "hint": "Verbind de getallen met de juiste plaats op de schaallijn.",
//       "explanation": "Zoek de getallen en verbind ze met de juiste vakken."
//     }
//   },
//   {
//     "id": 34,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 20.",
//       "steps": 20,
//       "answer1": 100,
//       "count": 9,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 20 toe aan het getal.",
//       "explanation": "Je telt telkens 20 op bij het getal."
//     }
//   },
//   {
//     "id": 35,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan er op de schaallijn? Verbind ze met de vakken.",
//       "options": [12, 18, 22, 30, 40],
//       "hint": "Verbind de getallen met de juiste plaats op de schaallijn.",
//       "explanation": "Zoek de getallen en verbind ze met de juiste vakken."
//     }
//   },
//   {
//     "id": 36,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 50.",
//       "steps": 50,
//       "answer1": 250,
//       "count": 6,
//       "defaultValue": 0,
//       "hint": "Voeg telkens 50 toe aan het getal.",
//       "explanation": "Je telt telkens 50 op bij het getal."
//     }
//   },
//   {
//     "id": 37,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Medium",
//     "type": "scale1",
//     "metadata": {
//       "question": "Welke getallen passen er op deze schaallijn?",
//       "options": [20, 40, 60, 80, 100],
//       "hint": "Zoek de getallen en verbind ze met de schaallijn.",
//       "explanation": "Plaats de getallen op de juiste plek op de schaallijn."
//     }
//   },
//   {
//     "id": 38,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan er op de schaallijn? Verbind ze met de vakken.",
//       "options": [11, 18, 25, 32],
//       "hint": "Zoek de getallen en verbind ze met de schaallijn.",
//       "explanation": "Verbind de getallen met de juiste plaatsen op de schaallijn."
//     }
//   },
//   {
//     "id": 39,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Advanced",
//     "type": "scale2",
//     "metadata": {
//       "question": "Welke getallen staan op deze schaal? Verbind ze met de vakken.",
//       "options": [13, 27, 35, 50, 67],
//       "hint": "Verbind de getallen met de juiste plaatsen op de schaallijn.",
//       "explanation": "Zoek de getallen en plaats ze op de juiste plekken."
//     }
//   },
//   {
//     "id": 40,
//     "group": "4",
//     "subject": "Rekenen",
//     "category": "Blok 1 Les 1",
//     "subcategory": "Doel 1",
//     "level": "Easy",
//     "type": "fill_blank",
//     "metadata": {
//       "question": "Tel verder met sprongen van 4.",
//       "steps": 4,
//       "answer1": 12,
//       "count": 10,
//       "defaultValue": 0,
//       "hint": "Tel telkens 4 op bij het getal.",
//       "explanation": "Je telt telkens 4 op bij het getal."
//     }
//   }
// ]


const QUESTIONS_DATA = [
    {
        "id": 9,
        "type": "math9",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the numbers that is multiplication of the top number",
            "method": "multiplication",
            "data": [
                { "id": 1, "result": 12, "answer": [[3, 4], [6, 2], [4, 3]] },
                { "id": 2, "result": 20, "answer": [[10, 2], [5, 4], [20, 1]] },
                { "id": 3, "result": 50, "answer": [[25, 2], [10, 5], [50, 1]] },
                { "id": 4, "result": 60, "answer": [[30, 2], [20, 3], [15, 4]] }
            ]
            ,
            "hint": "Follow this: 3 * ? = 12, 6 * ? = 12, 4 + ? = 12"
        }
    },
    {
        "id": 8,
        "type": "math8",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the numbers that is addition of the top number",
            "method": "addition",
            "data": [
                { "id": 1, "result": 10, "answer": [[5, 5], [8, 2], [6, 4]] },
                { "id": 2, "result": 20, "answer": [[10, 10], [18, 2], [15, 5]] },
                { "id": 3, "result": 50, "answer": [[25, 25], [30, 20], [42, 8]] },
                { "id": 4, "result": 60, "answer": [[30, 30], [40, 20], [49, 11]] }
            ],
            "hint": "Follow this: 5 + ? = 10, 8 + ? = 10, 6 + ? = 10"
        }
    },
    {
        "id": 7,
        "type": "math7",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the number that is multiplication of the top number",
            "method": "multiplication",
            "data": [
                { "id": 1, "result": 10, "option": 2, "answer": 8 },
                { "id": 2, "result": 20, "option": 10, "answer": 10 },
                { "id": 3, "result": 50, "option": 25, "answer": 25 },
                { "id": 4, "result": 60, "option": 20, "answer": 15 }
            ],
            "hint": "Follow this: 2 * ? = 10"
        }
    },
    {
        "id": 6,
        "type": "math6",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the number that is addition of the top number",
            "method": "addition",
            "data": [
                { "id": 1, "result": 10, "option": 2, "answer": 8 },
                { "id": 2, "result": 20, "option": 10, "answer": 10 },
                { "id": 3, "result": 50, "option": 25, "answer": 25 },
                { "id": 4, "result": 35, "option": 20, "answer": 15 }
            ],
            "hint": "Follow this: 2 + ? = 10"
        }
    },
    {
        "id": 5,
        "type": "math5",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the previous number and next number.",
            "data": [
                { "id": 1, "number": 18, "firstNumber": 17, "lastNumber": 19 },
                { "id": 2, "number": 45, "firstNumber": 44, "lastNumber": 46 },
                { "id": 3, "number": 69, "firstNumber": 68, "lastNumber": 70 }
            ],
            "hint": "Follow this: ? 18 ?. What is the number of previous number and next number?"
        }
    },
    {
        "id": 4,
        "type": "math4",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Between which number?",
            "data": [
                { "id": 1, "number": 10, "from": 1, "to": 15 },
                { "id": 2, "number": 20, "from": 19, "to": 29 },
                { "id": 3, "number": 30, "from": 30, "to": 39 },
                { "id": 4, "number": 40, "from": 39, "to": 49 },
                { "id": 5, "number": 50, "from": 49, "to": 69 }
            ],
            "hint": "Match the number withing the range numbers."
        }
    },
    {
        "id": 3,
        "type": "scale2",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Advance",
        "metadata": {
            "question": "Which numbers are there in this boxes? Connect with the scale line.",
            "options": [12, 50, 34, 43, 63, 89],
            "hint": "Just count 1 by 1 of the scale line and connect with the scale line"
        }
    },
    {
        "id": 2,
        "type": "scale1",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Medium",
        "metadata": {
            "question": "Which numbers are there in this scale?",
            "options": [12, 50, 34, 43, 63, 89, 99, 100, 43],
            "hint": "Just count 1 by 1 of the scale line and type at the boxes"
        }
    },
    {
        "id": 1,
        "type": "fill_blank",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Continue counting in jumps of 10.",
            "steps": 10,
            "answer1": 12,
            "count": 10,
            "defaultValue": 3,
            "hint": "Just add 10 with every number"
        }
    }
]


export default function ArithmeticPage() {
    const [question, setQuestion] = useState(0)

    const isFirst = question === 0
    const isLast = question === QUESTIONS_DATA.length - 1
    const q = QUESTIONS_DATA[question]

    const handlePrev = () => setQuestion((prev) => Math.max(prev - 1, 0))
    const handleNext = () => setQuestion((prev) => Math.min(prev + 1, QUESTIONS_DATA.length - 1))

    // Render by type
    const content = useMemo(() => {
        if (!q) return null

        switch (q.type) {
            case 'fill_blank': {
                const start = q.metadata.answer1 ?? 10
                const step = q.metadata.steps ?? 10
                const count = q.metadata.count ?? 10
                const prefilled = q.metadata.defaultValue ?? 2

                return (
                    <ArrFill
                        key={q.id}
                        rows={[{ start, step, maxLength: count, prefilledCount: prefilled, inputMaxLength: 3 }]}
                    />
                )
            }
            case 'scale1': {
                const opts = q.metadata.options ?? []
                const presetLineNums = opts.map((lineNum: number, i: number) => ({ dotIndex: i, lineNum }))

                return (
                    <ArrScaleQuiz
                        key={q.id}
                        mode="preConnected"
                        presetLineNums={presetLineNums}
                        dotCount={opts.length}
                    />
                )
            }
            case 'scale2': {
                const opts = q.metadata.options ?? []
                return (
                    <ArrScaleQuiz
                        key={q.id}
                        mode="preFilledBoxes"
                        presetBoxNumbers={opts}
                        dotCount={opts.length}
                    />
                )
            }
            case 'math4': {
                const questions = q.metadata.data ?? []
                return (
                    <ArrNumMatch
                        key={q.id}
                        data={questions}
                    />
                )
            }
            case 'math5': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrFirstAndSecondNumber
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            case 'math6': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrNumAddMulti
                        method={"addition"}
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            case 'math7': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrNumAddMulti
                        method={"multiplication"}
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            case 'math8': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrNumAddMultiOptions
                        method={"addition"}
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            case 'math9': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrNumAddMultiOptions
                        method={"multiplication"}
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            default:
                return null
        }
    }, [q])

    // Difficulty pills highlight
    const level = q?.level ?? 'Easy'
    const pillBase = 'py-2 px-5 rounded-lg font-semibold'
    const active = 'bg-primary text-white'
    const inactive = 'bg-transparent text-black'

    return (
        <>
            {/* Top bar */}
            <div className='flex items-center justify-between mb-5'>
                <div className='flex items-center gap-3'>
                    <Button
                        onClick={handlePrev}
                        disabled={isFirst}
                        className='rounded-2xl py-7 pl-2 font-bold text-xl disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        <div className='size-10 bg-white text-black rounded-2xl flex items-center justify-center'>
                            <IoMdArrowRoundBack size={50} className='text-5xl' />
                        </div>
                        Back
                    </Button>

                    {/* Breadcrumbs from data */}
                    <div className='text-primary flex gap-3 items-center'>
                        <p>Group {q.group}</p>
                        <IoIosArrowForward />
                        <p>{q.subject}</p>
                        <IoIosArrowForward />
                        <p>{q.category}</p>
                    </div>
                </div>

                {/* Difficulty pills */}
                <div className='bg-white p-1 rounded-lg flex items-center'>
                    <div className={`${pillBase} ${level === 'Easy' ? active : inactive}`}>Easy</div>
                    <div className={`${pillBase} ${level === 'Medium' ? active : inactive}`}>Medium</div>
                    <div className={`${pillBase} ${level === 'Advance' ? active : inactive}`}>Advance</div>
                </div>
            </div>



            {/* Body */}
            <div key={q.id} className='p-10 rounded-[30px]  w-full h-full border flex flex-col bg-white'>
                {/* Question text */}
                <div className="mb-4 text-lg font-semibold">
                    <h1 className='font-bold'>Question {question + 1}</h1>
                    <p>{q.metadata.question}</p>
                </div>
                {content}


                {/* Footer actions */}
                <div className='flex items-center justify-between mt-6'>
                    <div>
                        {/* fixed stray bracket in className */}
                        <Button className='mt-5 py-6 bg-[#e8edff] hover:bg-[#e8edff]/70 text-black border'>
                            <ChevronLeft className="mr-2" /> Switch Category
                        </Button>
                    </div>

                    <Button
                        onClick={handleNext}
                        disabled={isLast}
                        className='rounded-2xl py-7 pr-2 font-bold text-xl disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        Next
                        <div className='size-10 bg-black rounded-2xl flex items-center justify-center ml-2'>
                            <IoMdArrowRoundForward size={50} className='text-5xl' />
                        </div>
                    </Button>
                </div>
            </div>
        </>

    )
}
