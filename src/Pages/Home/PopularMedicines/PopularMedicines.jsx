import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MedicineItem from '../../Shared/MedicineItem';  // Rename this component accordingly
import useMedicines from '../../../hooks/useMedicines';  // Your custom hook for medicines data

const PopularMedicines = () => {
    const [medicines] = useMedicines();

    // Filter medicines by category "popular"
    const popularMedicines = medicines.filter(item => item.category === 'popular');

    return (
        <section className='mb-12'>
            <SectionTitle heading={'OUR MEDICINES'} subHeading={'Popular Items'} />
            <div className='grid md:grid-cols-2 gap-12'>
                {
                    popularMedicines.map(item => (
                        <MedicineItem key={item._id} item={item} />
                    ))
                }
            </div>

            {/* <div className='flex justify-center'>
                <button className='btn btn-outline border-0 border-b-4 mt-4'>View Full Catalogue</button>
            </div> */}
        </section>
    );
};

export default PopularMedicines;
