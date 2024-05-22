// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { IoMdPerson } from "react-icons/io";
// import { FaClock } from "react-icons/fa";
// import { RxDot } from "react-icons/rx";
// import { IoIosArrowForward } from "react-icons/io";


// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//   </Box>
// );

// const items1 = [
//   { name: 'pity party on wheels', spacing: '20px', fontSize: '30px' },
//   { name: <><IoMdPerson /> 4</>, spacing: '10px', fontSize: '15px' },
//   { name: <><FaClock /> 4:30 PM</>, spacing: '15px', fontSize: '15px' }
// ];

// export default function RideCard() {
//   const card = (
//     <React.Fragment>
//       <CardContent className="cardContent" style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div>
//           {items1.map((item, index) => (
//             <span key={index} style={{ marginRight: item.spacing, fontSize: item.fontSize }} >
//               {item.name}
//               {index !== items1.length - 1 && bull}
//             </span>
//           ))}
//           <Typography sx={{ mb: 0.5, mt: 2 }} color="#3d2814">
//             <RxDot /> UCLA
//             <br/>
//             <RxDot /> USC
//           </Typography>
//         </div>
//         <div>
//           <CardActions sx={{ justifyContent: 'flex-end', mt: 4 }}>
//             <Button style={{ fontSize: '20px', color: '#3d2814' }}>
//               <IoIosArrowForward />
//             </Button>
//           </CardActions>
//         </div>
//       </CardContent>
//     </React.Fragment>
//   );

//   return (
//     <Box sx={{ minWidth: 275 }}>
//       <Card variant="outlined" sx={{ borderWidth: '2px', borderColor: '#3d2814' }}>
//         {card}
//       </Card>
//     </Box>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

// const card = () => {
//     return(
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Word of the Day
//       </Typography>
//     </CardContent>
//   </React.Fragment>);
// };

export default function RideCard() {
  return (
    <React.Fragment>
    <Card variant="outlined">
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
        </Typography>
    </CardContent>
</Card>
</React.Fragment>
  );
}


{/* <Card variant="outlined">
<React.Fragment>
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
        </Typography>
    </CardContent>
</React.Fragment>
</Card> */}

