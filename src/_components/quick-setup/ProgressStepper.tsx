import localFont from 'next/font/local';

type Props = {
  stepNumber: number;
};

interface TextByStep {
  title: string;
  subtitle: string;
}

const sohneBreit = localFont({
  src: [
    {
      path: '../../fonts/TestSöhneBreit-Fett.otf',
      weight: '700', // Font weight: Bold (700)
    },
  ],
  variable: '--font-sohne-breit',
});
const textByStep: Record<number, TextByStep> = {
  1: {
    title: 'Store information',
    subtitle:
      'Take a look at your store information and make sure that everything right',
  },
  2: {
    title: 'Integrations and ad accounts',
    subtitle: 'Connect advertising accounts that you going to track',
  },
  5: {
    title: 'Connect your existing ads',
    subtitle: 'We automatically inject our UTMs into your ads ',
  },
};

const ProgressStepper: React.FunctionComponent<Props> = ({ stepNumber }) => {
  const currentText =
    stepNumber > 1 && stepNumber < 5 ? textByStep[2] : textByStep[stepNumber];
  return (
    <>
      <div className=" w-full h-2 bg-darkGrade25 mb-6 rounded-md">
        <div
          className="h-2 bg-primaryColor rounded-md"
          style={{ width: `${(stepNumber / 3) * 100}%` }}
        />
      </div>

      <span
        className={`text-3xl font-extrabold text-darkGrade100 font-extrabold ${sohneBreit.className}`}
      >
        {currentText.title}
      </span>

      <h6 className="text-textTeriraryColor text-md font-normal mt-3">
        {currentText.subtitle}
      </h6>
    </>
  );
};

export default ProgressStepper;
