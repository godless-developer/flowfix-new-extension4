import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { OfficeContent, ZoomControls } from "./components";
import { StatusLegend } from "./components/StatusLegend";

declare const chrome: any;

export function Office({ user }: { user: any }) {
  const containerStyle: React.CSSProperties = {
    width: "99%",
    height: "525px",
    overflow: "hidden",
    margin: "0 auto",
    backgroundImage: `url(${chrome.runtime.getURL("public/bg.png")})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16px",
    border: "2px solid #3c3c3cff",
  };

  return (
    <div style={containerStyle}>
      <TransformWrapper
        doubleClick={{ disabled: false, step: 0.7 }}
        pinch={{ excluded: [], step: 5 }}
        wheel={{
          excluded: [],
          smoothStep: 0.002,
          step: 0.2,
        }}
        zoomAnimation={{ animationTime: 300 }}
        minScale={1}
        maxScale={4}
        initialScale={2}
        limitToBounds={false}
        onInit={function noRefCheck() {}}
        initialPositionX={0}
        initialPositionY={0}
        centerZoomedOut={true}
        centerOnInit={true}
        disablePadding={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <ZoomControls
              zoomIn={() => zoomIn(0.2)}
              zoomOut={() => zoomOut(0.2)}
              resetTransform={() => resetTransform()}
            />
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!flex !justify-center !items-center"
            >
              <OfficeContent user={user} />
            </TransformComponent>
            <StatusLegend />
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
