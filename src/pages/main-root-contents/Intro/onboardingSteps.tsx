export const insertLineBreakAfter = (text: string, word: string) => {
  const parts = text.split(word);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      {word}
      <br />
      {parts[1]}
    </>
  );
};

export const onboardingSteps = [
  {
    text: insertLineBreakAfter(
      'Сайн уу, би чиний "Work buddy" чинь байна.',
      "чиний"
    ),
  },
  {
    text: insertLineBreakAfter(
      "Мэдэхгүй зүйлээ надаас асууж байгаарай",
      "асууж"
    ),
  },
  {
    text: insertLineBreakAfter(
      "Би доорх төрлийн асуултуудад хариулж чадна",
      "асуултуудад"
    ),
    bullets: [
      {
        title: "Компанийн дотоод дүрэм, гэрээ",
        number: 1,
        style: {
          backgroundColor: "#2C4CEC",
          boxShadow: "-2px -2px 4px 0px rgba(0, 0, 0, 0.25) inset",
        },
        subtitle: insertLineBreakAfter(
          "Түлхүүр үг ашиглан хялбархан хэрэгтэй мэдээллээ асуух боломжтой",
          "асуух"
        ),
      },
      {
        title: "Оффисын талаар",
        number: 2,
        style: {
          backgroundColor: "#FFAA21",
          boxShadow: "-2px -2px 4px 0px rgba(0, 0, 0, 0.25) inset",
        },
        subtitle: insertLineBreakAfter(
          "Ямар нэг зүйл олохгүй, мэдэхгүй бол санаа зоволгүй асуугаарай",
          "зоволгүй"
        ),
      },
      {
        title: "Ажлын талаар бүхий л зүйлс",
        number: 3,
        style: {
          backgroundColor: "#02C04B",
          boxShadow: "-2px -2px 4px 0px rgba(0, 0, 0, 0.25) inset",
        },
        subtitle: insertLineBreakAfter(
          "Хэдэн цаг тардаг, яаж чөлөө авдаг вэ гэдгийг ч асуух боломжтой",
          "асуух"
        ),
      },
    ],
  },
];
