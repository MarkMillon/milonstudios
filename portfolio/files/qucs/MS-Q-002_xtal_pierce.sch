<Qucs Schematic 24.4.0>
<Properties>
  <View=0,0,1200,800,1,0,0>
  <Grid=10,10,1>
  <DataSet=MS-Q-002_xtal_pierce.dat>
  <DataDisplay=MS-Q-002_xtal_pierce.dpl>
  <OpenDisplay=1>
  <Script=MS-Q-002_xtal_pierce.m>
  <RunScript=0>
  <showFrame=0>
  <FrameText0=MS-Q-002  24.576 MHz PIERCE OSCILLATOR  REV A>
  <FrameText1=Drawn By: M. Fuchs / Milon Studio>
  <FrameText2=Date: 2025-08-12>
  <FrameText3=Phase noise + temperature sweep, Aperture HAT master clock>
</Properties>
<Symbol>
</Symbol>
<Components>
  <GND * 1 200 380 0 0 0 0>
  <Vdc V1 1 140 320 18 -26 0 1 "3.3 V" 1>
  <GND * 1 140 380 0 0 0 0>
  <R Rf 1 380 240 -26 15 0 0 "1 MOhm" 0 "26.85" 0 "0.0" 0 "0.0" 0 "26.85" 0 "european" 0>
  <C Cin 1 320 320 17 -26 0 1 "18 pF" 1 "" 0 "neutral" 0>
  <GND * 1 320 380 0 0 0 0>
  <C Cout 1 460 320 17 -26 0 1 "18 pF" 1 "" 0 "neutral" 0>
  <GND * 1 460 380 0 0 0 0>
  <R Rs 1 410 180 -26 -55 0 0 "470 Ohm" 1 "26.85" 0 "0.0" 0 "0.0" 0 "26.85" 0 "european" 0>
  <SUB X1 1 380 180 -30 -75 0 0 "xtal_24p576MHz" 1>
  <.AC AC1 1 100 460 0 39 0 0 "log" 1 "1 Hz" 1 "1 MHz" 1 "601" 1 "no" 0>
  <.TR TR1 1 100 530 0 39 0 0 "lin" 1 "0" 1 "2 us" 1 "10001" 1 "Trapezoidal" 0 "2" 0 "1 ns" 0 "1e-16" 0 "150" 0 "0.001" 0 "1 pA" 0 "1 uV" 0 "26.85" 0 "1e-3" 0 "1e-6" 0 "1" 0 "CroutLU" 0 "no" 0 "yes" 0 "0" 0>
  <SPICE Nin1 1 380 100 -65 -28 0 0 "noise_xtal.lib" 1 "Vn" 1 "no" 0>
  <.SP SP1 1 100 600 0 39 0 0 "log" 1 "1 Hz" 1 "1 MHz" 1 "601" 1 "yes" 0 "1" 0 "2" 0 "no" 0 "no" 0>
  <Eqn Eqn1 1 700 480 -28 15 0 0 "L_f=10*log10(noise(out)^2/(2*P_carrier))" 1 "yes" 0>
  <Eqn Eqn2 1 700 560 -28 15 0 0 "PM=phase(Vout_fund)*180/pi" 1 "yes" 0>
</Components>
<Wires>
  <140 280 140 290 "" 0 0 0 "">
  <140 240 320 240 "" 0 0 0 "">
  <320 240 320 290 "" 0 0 0 "">
  <380 270 380 290 "" 0 0 0 "">
  <460 290 460 270 "" 0 0 0 "">
  <320 350 320 380 "" 0 0 0 "">
  <460 350 460 380 "" 0 0 0 "">
  <140 350 140 380 "" 0 0 0 "">
  <380 210 380 240 "" 0 0 0 "">
  <380 130 380 150 "" 0 0 0 "">
  <440 180 460 180 "" 0 0 0 "">
  <460 180 460 200 "" 0 0 0 "">
  <320 240 380 240 "out_node" 360 220 0 "">
</Wires>
<Diagrams>
  <Rect 100 700 480 240 3 #c0c0c0 1 00 1 1 1e+06 1 -160 20 0 1 1 0 1 3 1 1 1 315 0 225 "" "" "":
	<"Phase Noise L(f) [dBc/Hz]" #ff0000 0 3 0 0 0>
	  <Mkr 1000 0 -55 3 0 0>
  </Rect>
  <Rect 600 700 480 240 3 #c0c0c0 1 00 1 0 2e-06 0.5e-6 -2 1 2 1 1 0 1 1 1 0 315 0 225 "" "" "":
	<"Vout(t) startup transient" #0000ff 0 3 0 0 0>
  </Rect>
</Diagrams>
<Paintings>
  <Text 10 10 16 #c97b3f 0 "MS-Q-002  24.576 MHz PIERCE OSCILLATOR  REV A">
  <Text 10 40 12 #6b7785 0 "Drawn by: M. Fuchs / Milon Studio   Date: 2025-08-12">
  <Text 10 60 12 #6b7785 0 "Driving AK5552 ADC master clock on the Aperture HAT (MS-K-014)">
  <Text 600 100 12 #7fe787 0 "X1 model:  Lm=8.2mH  Cm=5.1fF  Rm=40Ohm  C0=2.8pF">
  <Text 600 130 12 #7fe787 0 "Target phase noise: -138 dBc/Hz @ 1kHz offset">
  <Line 10 80 1180 0 #2a3744 1 1>
</Paintings>
