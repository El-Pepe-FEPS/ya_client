import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from '@mui/material';

export const Resources = () => {
    return (
        <Stack spacing={5}>
            <Typography variant='h3' component='h2'>
                Додаткова інформація для людей, які постраждали від війни
            </Typography>
            <Typography variant='body1' paragraph>
                На цій сторінці ви зможете знайти корисні ресурси та інформацію для людей,
                які постраждали від війни. Ми розуміємо складнощі, з якими ви стикаєтеся,
                тому намагаємося забезпечити вам доступ до різноманітних джерел підтримки та допомоги.
            </Typography>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='h4' component='h3'>
                        Надання допомоги ВПО
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1' paragraph>
                        Хто може звернутися: фізична особа
                    </Typography>
                    <Typography variant='body1' paragraph gutterBottom>
                        Документи, що необхідно надати для отримання послуги:
                    </Typography>
                    <Typography variant='body1' paragraph gutterBottom>
                        1. Заява за формою згідно з додатком 1 до Порядку надання
                        допомоги на проживання внутрішньо переміщеним особам,
                        затвердженого постановою № 332 (далі – Порядок).
                    </Typography>
                    <Typography variant='body1' paragraph gutterBottom>
                        2. У разі подання заяви про виплату допомоги малолітній дитині,
                        яка прибула без супроводу законного представника: особою,
                        яка перебуває у сімейних, родинних відносинах (у тому числі хрещені батьки),
                        надається документ, що підтверджує сімейні,
                        родинні зв’язки особи з дитиною, виданий службою у справах дітей за місцем звернення;
                        особою, яку батьки або інші законні представники уповноважили супроводжувати дитину,
                        надається письмова заява одного із законних представників,
                        завірена органом опіки та піклування; особою,
                        до сім’ї якої тимчасово влаштовано дитину,
                        яка залишилися без батьківського піклування,
                        надається копія наказу служби у справах дітей про тимчасове влаштування
                    </Typography>

                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='h4' component='h3' gutterBottom>
                        Допомога від національних неурядових організацій та способи її отримання
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='h4' component='h3' gutterBottom>
                        1.  Благодійна організація «Фонд українські сестри та кідфрендлі»
                    </Typography>
                    <Typography variant='body1' paragraph gutterBottom>
                        Надають разову фінансову підтримку тим, хто залишився без роботи та джерел до існування.
                    </Typography>
                    <Link
                        href='https://docs.google.com/forms/d/e/1FAIpQLSeV3o6QJjYflkxbumbh1Ux6B0lOHTvMGojOBDzJKY-rcaVgCQ/viewform'
                        display='block'
                        sx={{mb: 2}}
                    >
                        Залишити запит на допомогу в Фонд українські сестри та кідфрендлі
                    </Link>

                    <Typography variant='h4' component='h3' gutterBottom>
                        2.  Благодійний фонд «Щаслива дитина»
                    </Typography>
                    <Typography variant='body1' paragraph gutterBottom>
                        Надають допомогу сиротам та хворим дітям і дітям із малозабезпечених сімей Запорізької області.
                    </Typography>
                    <Link
                        href='https://deti.zp.ua/uk/'
                        display='block'
                        sx={{mb: 2}}
                    >
                        Веб сайт фонду Щаслива дитина
                    </Link>
                    <Typography variant='body1' paragraph gutterBottom>
                        Телефон: 050 452 03 92
                    </Typography>

                    <Typography variant='h4' component='h3' gutterBottom>
                        3.  Запорізький благодійний фонд «Єдність за майбутнє»
                    </Typography>
                    <Typography variant='body1' paragraph gutterBottom>
                        Надають багатоцільову матеріальну допомогу постраждалим від війни.
                    </Typography>
                    <Link
                        href='https://register.pagulasabi.ee/uk/'
                        display='block'
                        sx={{mb: 2}}
                    >
                        Веб сайт фонду Єдність за майбутнє
                    </Link>
                    <Typography variant='body1' paragraph gutterBottom>
                        Телефон: 067 105 28 03
                    </Typography>

                    <Typography variant='h4' component='h3' gutterBottom>
                        4.  Gate to Ukraine
                    </Typography>
                    <Typography variant='body1' paragraph gutterBottom>
                        Надають пожертви від американців українським багатодітним сім’ям,
                        які постраждали внаслідок війни, були вимушені переїхати
                        або знаходяться на тимчасово окупованих територіях.
                    </Typography>
                    <Link
                        href='https://gate.org/get-help/'
                        display='block'
                        sx={{mb: 2}}
                    >
                        Веб сайт Gate to Ukraine
                    </Link>

                    <Typography variant='h4' component='h3' gutterBottom>
                        5.  The 1k Project
                    </Typography>
                    <Typography variant='body1' paragraph gutterBottom>
                        Шукають спонсорів, які пожертвують гроші безпосередньо на банківський рахунок людини.
                    </Typography>
                    <Link
                        href='https://airtable.com/apppw1gQ0fUWbTDqz/shrvfSCquvjgdEJPy'
                    >
                        Веб сайт The 1k Project
                    </Link>

                </AccordionDetails>
            </Accordion>
        </Stack>

    )
}
