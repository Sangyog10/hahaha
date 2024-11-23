import facebookIcon from '@/app/assets/Images/logos/brands/facebook.svg';
import disneyIcon from '@/app/assets/Images/logos/brands/disney.svg';
import airbnbIcon from '@/app/assets/Images/logos/brands/airbnb.svg';
import appleIcon from '@/app/assets/Images/logos/brands/apple.svg';
import sparkIcon from '@/app/assets/Images/logos/brands/spark.svg';
import samsungIcon from '@/app/assets/Images/logos/brands/samsung.svg';
import quoraIcon from '@/app/assets/Images/logos/brands/quora.svg';
import sassIcon from '@/app/assets/Images/logos/brands/sass.svg';
import Image from 'next/image';

const logos = [
    { src: facebookIcon, alt: "Facebook" },
    { src: disneyIcon, alt: "Disney" },
    { src: airbnbIcon, alt: "Airbnb" },
    { src: appleIcon, alt: "Apple" },
    { src: sparkIcon, alt: "Spark" },
    { src: samsungIcon, alt: "Samsung" },
    { src: quoraIcon, alt: "Quora" },
    { src: sassIcon, alt: "Sass" },
];

const InfiniteMarquee = () => {
    const renderLogos = (isHidden = false, direction = 'normal') => (
        <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll`}
            style={{ animationDirection: direction }}
            aria-hidden={isHidden}>
            {logos.map((logo, index) => (
                <li key={index}>
                    <Image src={logo.src} alt={logo.alt} />
                </li>
            ))}
        </ul>
    );

    return (
        <div className='bg-black py-6 flex flex-col items-center w-[100vw]'>
            <div className="w-full inline-flex flex-nowrap overflow-hidden mb-5">
                {renderLogos()}
                {renderLogos(true)}
                {renderLogos(true)}
            </div>
            <div className="w-full inline-flex flex-nowrap overflow-hidden">
                {renderLogos(false, 'reverse')}
                {renderLogos(true, 'reverse')}
                {renderLogos(true, 'reverse')}
            </div>
        </div>
    );
};

export default InfiniteMarquee;