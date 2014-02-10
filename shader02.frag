#version 150 compatibility

uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float specularExponent;
uniform int shader;

in fragmentData
{
  vec3 pos;
  vec3 normal;
  vec4 color;
}frag;

///////////////

void main()
{
  vec4 outcol = frag.color;

  if(shader == 2)
    {
      ////////////////////////////
      //exercise 2.2 Phong shading
      //TODO add your code here
      vec3 lpos = gl_LightSource[0].position.xyz;
      float d = distance(lpos, frag.pos);
      vec3 cpos = vec3(0.0, 0.0, 1.0);

      vec3 n = normalize(frag.normal);
      vec3 l = normalize(lpos - frag.pos);
      vec3 e = normalize(frag.pos - cpos);
      vec3 r = reflect(l, n);
      float mu = 0.3;
      

      float attenuation = 1.0 / (gl_LightSource[0].constantAttenuation
				 + gl_LightSource[0].linearAttenuation * d
				 + gl_LightSource[0].quadraticAttenuation * d * d);

      vec4 Ia = ambientColor;
      vec4 Id = attenuation * diffuseColor * dot(n, l);
      vec4 Is = attenuation * specularColor * pow(max(dot(e, r), 0), mu*specularExponent);

      vec4 I = Ia + Id + Is;
      outcol = I;
      ////////////////////////////
    }

  if(shader == 3)
    {
      ////////////////////////////
      //exercise 2.3 toon shading
      //TODO add your code here
      vec3 lpos = gl_LightSource[0].position.xyz;
      float d = distance(lpos, frag.pos);

      vec3 n = normalize(frag.normal);
      vec3 l = normalize(lpos - frag.pos);
      vec3 e = normalize(frag.pos - l);
      vec3 r = reflect(l, n);
      
      float If = dot(l, n);
      vec4 I;
      I.xyzw = vec4(0.1, 0.1, 0.1, 1.0);
      if(If > 0.25) I.xyz = vec3(0.6, 0.2, 0.2);
      if(If > 0.50) I.xyz = vec3(0.8, 0.4, 0.4);
      if(If > 0.98) I.xyz = vec3(0.8, 0.8, 0.8);

      outcol = I;
      ////////////////////////////
    }

  gl_FragColor = outcol;
}
